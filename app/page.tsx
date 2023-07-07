'use client'
import { chatConnection } from "./chat/chatConnection";
import { ShowMessages } from "./chat/chatMessages";

chatConnection.connect()

export default function Home() {
  return (
    <ShowMessages></ShowMessages>
  )
}
