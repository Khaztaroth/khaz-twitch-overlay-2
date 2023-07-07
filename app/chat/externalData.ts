import { channelId } from "./chatConnection"

type Data = {
    data?: Object
}

export async function getGlobalBadges() {
    const res = await fetch('https://api.fossabot.com/v2/cached/twitch/badges/global', {next: {revalidate: 60*60}})
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function getUserBadges() {
    const res = await fetch(`https://api.fossabot.com/v2/cached/twitch/badges/users/${channelId}`, {next: {revalidate: 60*60}})
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}