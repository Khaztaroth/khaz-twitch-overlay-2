import React, { useEffect, useState } from "react";
import { ChatMessage, useChat } from "./chatHandler";
import { parseChatMessage } from "@twurple/common";
import { BasicParsedMessagePart } from '@twurple/common/lib/emotes/ParsedMessagePart'
import { formatUserBadges, formatGlobalBadges, formatPronouns } from "./externalData";
import { ColorCorrection } from "./colorCorrection";

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
        result.push(<img src={emoteUrl(part.id)} alt={part.name} className="inline-block w-auto h-6"/>)
      } break
      default: {
        result.push(part.message)
      }
    }
  })
  return result
}

export async function FormatBadges(id: string, value: string): Promise<JSX.Element | undefined> {
  const userBadges = await formatUserBadges();
  const globalBadges = await formatGlobalBadges();
  var badge: JSX.Element | undefined

  if (userBadges?.[id] !== undefined) {
    badge = <img src={ userBadges?.[id]?.[value]?.url} alt={userBadges?.[id]?.[value]?.alt} className="w-auto h-4 mr-1 md:h-6 md:mr-2" />
  } else if (globalBadges?.[id] !== undefined) {
    badge = <img src={ globalBadges?.[id]?.[value]?.url} alt={globalBadges?.[id]?.[value]?.alt} className="w-auto h-4 mr-1 md:h-6 md:mr-2"/>
  } else badge = undefined


  return badge
}

export function ShowMessages() {
  const messages: Array<ChatMessage> = useChat();
  const [formattedMessages, setFormattedMessages] = useState<JSX.Element[]>([]);

useEffect(() => {

    const formatted = messages.map((msg, index) => {
      const isBold = () => {if (msg.isAction || msg.isAnnouncement || msg.isSub || msg.isGift) {return true} else return false}
      const badgeElements = Array.from(msg.userBadges.entries()).map(([key, value], index) => {
        return <span key={index} className="inline-block">{FormatBadges(key, value)}</span>;
      });
      const pronouns = formatPronouns(msg.username).then((formattedPronouns) => {
        if (formattedPronouns) {return (
        <span 
          className="bg-green mx-0.5 px-1.5 text-xs rounded-lg outline outline-1 outline-white text-right md:text-sm">
          {formattedPronouns}
        </span>
        )}
      })
        return (
          <div key={index} 
          className={
            `${isBold()? 'bg-bold italic' : 'bg-default'}
            text-white my-2 mx-3 rounded-md p-1 outline outline-1 outline-black drop-shadow-md h-full`
          }
          style={msg.isAction? {color: ColorCorrection(msg.userColor ?? '', msg.username)} : {color: ''}}
          >
            <span className="drop-shadow-none">
            <span className="align-middle">{badgeElements}</span> 
            {pronouns}
            <span className="font-bold text-xm md:text-xl" style={{color: `${ColorCorrection(msg.userColor ?? '', msg.username)}`}}>{msg.username}:</span> 
            {msg.isGift? `Thanks for the ${(msg.subLength !== undefined && msg.subLength>1)? `${msg.subLength} gifted subs` : 'gifted sub'}`: 
            msg.isSub? (msg.subLength !== undefined && msg.subLength>1)? 
            ` just resubscribed for ${msg.subLength} months!` : 
            ' just subscribed!' : 
            ''}
            </span>
            <div className="block drop-shadow-none text-xl md:text-2xl" id="message">{formatMessage(msg.message, msg.emotes)}</div>
        </div>
        )
    });

    setFormattedMessages(formatted);
  }, [messages]);

  return formattedMessages.slice(-15)

}