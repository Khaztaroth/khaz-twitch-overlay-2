import { useEffect, useRef, useState } from "react";

import { ChatAnnouncementInfo, ChatSubInfo, PrivateMessage, UserNotice } from '@twurple/chat'
import { chatConnection } from "./chatConnection";

export interface ChatMessage {
    username: string,
    userId: string,
    userColor: string | undefined,
    userBadges: Map<string, string>,
    message: string,
    emotes: Map<string, string[]>,
    subLength: number | undefined,
    isSub: Boolean,
    isAction: Boolean,
    isAnnouncement: Boolean,
}

export function useChat() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const messageRef = useRef<String[]>([]);

    function messageHandler(channel: string, user: string, messageContent: string, msg: PrivateMessage, type: string ) {

        let isAction = type.includes('action')

        const message: ChatMessage = {
            username: msg.userInfo.displayName,
            userId: msg.userInfo.userId,
            userColor: msg.userInfo.color,
            userBadges: msg.userInfo.badges,

            message: messageContent,
            emotes: msg.emoteOffsets,

            subLength: undefined,

            isSub: false,
            isAction: isAction,
            isAnnouncement: false
        }

        if(!messageRef.current.includes(msg.id)) {
            messageRef.current.push(msg.id)
            setMessages((prevMessage) => {
                return [...prevMessage.slice(-20), message]
            });
        }
    }
    function announcementHandler(channel: string, user: string, announcementContent: ChatAnnouncementInfo, msg: UserNotice) {

        const message: ChatMessage = {
            username: msg.userInfo.displayName,
            userId: msg.userInfo.userId,
            userColor: msg.userInfo.color,
            userBadges: msg.userInfo.badges,

            message: msg.message.value,
            emotes: msg.emoteOffsets,

            subLength: undefined,

            isSub: false,
            isAction: false,
            isAnnouncement: true
        }

        if(!messageRef.current.includes(msg.id)) {
            messageRef.current.push(msg.id)
            setMessages((prevMessage) => {
                return [...prevMessage.slice(-20), message]
            });
        }
    }

    function subscriptionHandler(channel: string, user: string, subContent: ChatSubInfo, msg: UserNotice) {

        const message: ChatMessage = {
            username: msg.userInfo.displayName,
            userId: msg.userInfo.userId,
            userColor: msg.userInfo.color,
            userBadges: msg.userInfo.badges,

            message: subContent.message || '',
            emotes: msg.emoteOffsets,

            subLength: subContent.months,

            isSub: true,
            isAction: false,
            isAnnouncement: false,
        }
        if(!messageRef.current.includes(msg.id)) {
            messageRef.current.push(msg.id)
            setMessages((prevMessage) => {
                return [...prevMessage.slice(-20), message]
            });
        }
    }

    useEffect(() => {
        chatConnection.onMessage((channel, user, text, msg) => messageHandler(channel, user, text, msg, 'message'));
        chatConnection.onAction((channel, user, text, msg) => messageHandler(channel, user, text, msg, 'action'));
        chatConnection.onAnnouncement((channel, user, announcementInfo, msg) => announcementHandler(channel, user, announcementInfo, msg));
        chatConnection.onSub((channel, user, subInfo, msg) => subscriptionHandler(channel, user, subInfo, msg));
        chatConnection.onResub((channel, user, subInfo, msg) => subscriptionHandler(channel, user, subInfo, msg));
    },[])

    return messages
}