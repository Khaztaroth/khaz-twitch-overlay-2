import React, { useEffect, useState } from "react";
import { ChatMessage, useChat } from "./chatHandler";
import { parseChatMessage } from "@twurple/common";
import { BasicParsedMessagePart } from '@twurple/common/lib/emotes/ParsedMessagePart'
import { getGlobalBadges, getUserBadges } from "./externalData";
import Image from "next/image";

function formatMessage(message: string, emoteOffsets: Map<string, string[]>): JSX.Element[] {

const emoteUrl = (id: string) => {
    const url = `https://static-cdn.jtvnw.net/emoticons/v2/${id}/default/dark/1.0`;
    return url
  };

  let result: JSX.Element[] = []

  const messageArray = parseChatMessage(message, emoteOffsets)
  messageArray.forEach((part: BasicParsedMessagePart | any, index: number) => {
    switch(part.type) {
      case 'text': {
        result.push(part.text)
      } break
      case 'emote': {
        result.push(<Image src={emoteUrl(part.id)} alt={part.name} width={25} height={25} style={{display: 'inline-block'}}/>)
      } break
      default: {
        result.push(part.message)
      }
    }
  })
  return result
}
type Badge = Record<string, {alt: string; url: string}>
async function formatUserBadges(): Promise<Record<string, Badge>> {
  const userBadgeData = await getUserBadges();

  const out: Record<string, Badge> = {};
  for (const badge of userBadgeData.data) {
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

async function formatGlobalBadges(): Promise<Record<string, Badge>>{
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

async function FormatBadges(id: string, value: string) {
  const userBadges = await formatUserBadges();
  const globalBadges = await formatGlobalBadges();
  var badge

  if (userBadges?.[id] !== undefined) {
    badge = <Image src={ userBadges?.[id]?.[value]?.url} alt={userBadges?.[id]?.[value]?.alt} width={15} height={15} />
  } else if (globalBadges?.[id] !== undefined) {
    badge = <Image src={ globalBadges?.[id]?.[value]?.url} alt={globalBadges?.[id]?.[value]?.alt} width={15} height={15} />
  }

  return badge
}

export function ShowMessages() {
  const messages: Array<ChatMessage> = useChat();
  const [formattedMessages, setFormattedMessages] = useState<JSX.Element[]>([]);

  useEffect(() => {

    const formatted = messages.map((msg, index) => {
      const isBold = () => {if (msg.isAction || msg.isAnnouncement || msg.isSub) {return true} else return false}
      const badgeElements = Array.from(msg.userBadges.entries()).map(([key, value], index) => {
        return <span key={index} className="inline-block">{FormatBadges(key, value)}</span>;
      });
        return (
          <div key={index} 
          className={
            `${isBold()? 'bg-bold italic text-white' : 'bg-default text-black'} my-2 mx-3 rounded-md p-1`
          }
          style={msg.isAction? {color: msg.userColor} : {color: ''}}
          >
            {badgeElements} <strong style={{color: `${msg.userColor}`}}>{msg.username}</strong> {msg.isSub? (msg.subLength !== undefined && msg.subLength>1)? `just resubscribed! for ${msg.subLength} months` : 'just subscribed!' : ''}
            <div className="block">{formatMessage(msg.message, msg.emotes)}</div>
        </div>
        )
    });

    setFormattedMessages(formatted);
  }, [messages]);

  return formattedMessages.slice(-14);
}