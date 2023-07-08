'use client'

import { ChatClient } from "@twurple/chat";
import { AppTokenAuthProvider } from "@twurple/auth"
import { ApiClient } from "@twurple/api";

const params = new URLSearchParams(window.location.search)

export const channel = params.get('channel') || 'khaztaroth315';
export const clientId = process.env.CLIENT_ID || '';
export const clientSecret = process.env.CLIENT_SECRET || '';

const authProvider = new AppTokenAuthProvider(clientId, clientSecret)
const api = new ApiClient({ authProvider })

export async function fetchUserId(): Promise<string>{
    const user = await api.users.getUserByName(channel)
    
    return user?.id || ''
}

export const chatConnection = new ChatClient({
    channels: [channel]
})
