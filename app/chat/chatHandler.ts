import { useEffect, useRef, useState } from "react";

import { ChatAnnouncementInfo, ChatSubInfo, ClearChat, ClearMsg, PrivateMessage, UserNotice } from '@twurple/chat'
import { chatConnection } from "./chatConnection";

export interface ChatMessage {
    username: string,
    userId: string,
    userColor: string | undefined,
    userBadges: Map<string, string>,

    message: string,
    id: string,
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
            id: msg.id,
            emotes: msg.emoteOffsets,

            subLength: undefined,

            isSub: false,
            isAction: isAction,
            isAnnouncement: false
        }

        setMessages((prevMessage) => {
            return [...prevMessage.slice(-20), message]
        })
    }
    function announcementHandler(channel: string, user: string, announcementContent: ChatAnnouncementInfo, msg: UserNotice) {

        const message: ChatMessage = {
            username: msg.userInfo.displayName,
            userId: msg.userInfo.userId,
            userColor: msg.userInfo.color,
            userBadges: msg.userInfo.badges,

            message: msg.message.value,
            id: msg.id,
            emotes: msg.emoteOffsets,

            subLength: undefined,

            isSub: false,
            isAction: false,
            isAnnouncement: true
        }

            setMessages((prevMessage) => {
                return [...prevMessage.slice(-20), message]
            });
        }

    function subscriptionHandler(channel: string, user: string, subContent: ChatSubInfo, msg: UserNotice) {

        const message: ChatMessage = {
            username: msg.userInfo.displayName,
            userId: msg.userInfo.userId,
            userColor: msg.userInfo.color,
            userBadges: msg.userInfo.badges,

            message: subContent.message || '',
            id: msg.id,
            emotes: msg.emoteOffsets,

            subLength: subContent.months,

            isSub: true,
            isAction: false,
            isAnnouncement: false,
        }
            setMessages((prevMessage) => {
                return [...prevMessage.slice(-20), message]
            });
        }
    
    function messageRemoveHandler(messageId: string) {
        setMessages((prevMessages) => {
            return prevMessages.filter((msg) => {
              return msg.id !== messageId;
            });
        });
    }

    function userRemoveHandler(msg: ClearChat) {
        setMessages((prevMessages) => {
            return prevMessages.filter((usr) => {
                return usr.userId !== msg.targetUserId
            })
        })
    }

    useEffect(() => {
        chatConnection.onMessage((channel, user, text, msg) => messageHandler(channel, user, text, msg, 'message'));
        chatConnection.onAction((channel, user, text, msg) => messageHandler(channel, user, text, msg, 'action'));
        chatConnection.onAnnouncement((channel, user, announcementInfo, msg) => announcementHandler(channel, user, announcementInfo, msg));
        chatConnection.onSub((channel, user, subInfo, msg) => subscriptionHandler(channel, user, subInfo, msg));
        chatConnection.onResub((channel, user, subInfo, msg) => subscriptionHandler(channel, user, subInfo, msg));
        chatConnection.onChatClear((channel, msg) => {setMessages(() => {return []})})
        chatConnection.onMessageRemove((channel, messageId, msg) => messageRemoveHandler(messageId))
        chatConnection.onTimeout((channel, user, duration, msg) => userRemoveHandler(msg))
        chatConnection.onBan((channel, user, msg) => userRemoveHandler(msg))
    },[])

    return messages
}