import { ChatClient } from "@twurple/chat";

export const channel = 'criticalrole'
export const channelId = '229729353'

export const clientId = process.env.CLIENT_ID
export const clientSecret = process.env.CLIENT_SECRET

export const chatConnection = new ChatClient({
    channels: [channel]
})
