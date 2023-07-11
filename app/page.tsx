'use client'
import { chatConnection } from "./chat/chatConnection";
import { ShowMessages } from "./chat/chatMessages";

chatConnection.connect()

export default function Home() {

  return (
    <div className="min-h-screen max-h-screen overscroll-y-contain mx-96 pb-10">
      <ShowMessages/>
    </div>
  )
}
