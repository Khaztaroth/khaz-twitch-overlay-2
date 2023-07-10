'use client'
import { useRef } from "react";
import { chatConnection } from "./chat/chatConnection";
import { ShowMessages } from "./chat/chatMessages";

chatConnection.connect()

export default function Home() {
  const messageRef = useRef<HTMLDivElement>(null)
  if (messageRef.current) {
    messageRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }
  return (
    <div className="min-h-screen max-h-screen overflow-y-clip">
      <ShowMessages/>
      <div ref={messageRef} />
    </div>
  )
}
