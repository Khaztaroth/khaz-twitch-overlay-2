import { api, channel } from "./chatConnection"
import NodeCache from "node-cache"

const timeToRevalidate = 3600*2
const cache = new NodeCache({stdTTL: timeToRevalidate})


const getUserId = async (channel: string) => {
    const id = await api.users.getUserByName(channel)
    cache.set(channel, id?.id)
    return cache.get(channel)
}

export async function getGlobalBadges() {
    const res = await fetch('https://api.fossabot.com/v2/cached/twitch/badges/global', {next: {revalidate: timeToRevalidate}})
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function getUserBadges() {
    const getID = async (channel: string) => {
        if (cache.get(channel) !== undefined) {
           const channelID: string | undefined = cache.get(channel)
           return channelID
        } else {
            const channelID: string | {} = await getUserId(channel) || {}
            cache.set(channel, channelID)
            return channelID
        }
    }
    const createBadgesURL = (id: string | {} | undefined) => {
        if (cache.get('badges_url') !== undefined) {
            const URL: string = cache.get('badges_url') || ''
            return URL
        } else {
            const URL = `https://api.fossabot.com/v2/cached/twitch/badges/users/${id}`
            cache.set('channel_badges_url', URL)
            return URL
        }
    }

    const id: string | undefined | {} = await getID(channel)
    const URL: string = createBadgesURL(id)

    const res = await fetch(URL, {next: {revalidate: timeToRevalidate}})
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

type Badge = Record<string, {alt: string; url: string}>

export async function formatUserBadges(): Promise<Record<string, Badge>> {
  const userBadgeData = await getUserBadges();

  const out: Record<string, Badge> = {};
  for (const badge of userBadgeData.data) {
    var versions: Badge = {};
    for (const version of badge?.versions) {
      const asset = version?.asset_2x || version?.asset_4x || version?.asset_1x
      if (!asset) continue;
        versions[version.id] = asset;
    }
    out[badge.id] = versions;
  }
  return out
}

export async function formatGlobalBadges(): Promise<Record<string, Badge>>{
  const globalBadgeData = await getGlobalBadges();

  const out: Record<string, Badge> = {};
  for (const badge of globalBadgeData.data) {
    var versions: Badge = {};
    for (const version of badge?.versions) {
      const asset = version?.asset_1x || version?.asset_2x || version?.asset_4x;
      if (!asset) continue;
        versions[version.id] = asset;
    }
    out[badge.id] = versions;
  }

  return out
}

export type Pronouns = {id: string, login: string, pronoun_id: string}
export type PronounData = Promise<[Pronouns]>

export async function fetchUserPronouns (user: string): Promise<Pronouns> {
    const URL = `https://pronouns.alejo.io/api/users/${encodeURIComponent(user)}`;

    var pronouns: Pronouns = <Pronouns>{};
    var cachedPronouns: Pronouns | undefined = cache.get(`${user}-pronouns`)

    if (cachedPronouns !== undefined) {
        pronouns = cachedPronouns
    } else {
        const res = await fetch(URL, {cache: "no-store"})
            if (!res.ok) {
                throw new Error(`can't fetch pronouns`)
            }
        const data: PronounData = res.json()
        pronouns = (await data)[0];
        cache.set(`${user}-pronouns`, (await data)[0])
    }
    
    return pronouns
}

export function formatPronouns(user: string): Promise<string | undefined> {
    return (fetchUserPronouns(user).then((pronounInfo) => {
        switch(pronounInfo?.pronoun_id) {
            case "aeaer": return "Ae/aer";
            case "any": return "Any"; 
            case "eem": return "E/em"; 
            case "faefaer": return "Fae/faer"; 
            case "hehim": return "He/him";
            case "heshe": return "He/she"; 
            case "hethey": return "He/they";
            case "hethem": return "He/them"; 
            case "itits": return "It/its"; 
            case "other": return "Other"; 
            case "perper": return "Per/per"; 
            case "sheher": return "She/her"; 
            case "shethey":return "She/they"; 
            case "shethem": return "She/them"; 
            case "theythem": return "They/them"; 
            case "vever": return "Ve/Ver"; 
            case "xexem": return "Xe/xem"; 
            case "ziehir": return "Zie/hir"; 
            default: return undefined;
        }
    }))
}