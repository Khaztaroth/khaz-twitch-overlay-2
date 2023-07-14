'use client'
import { useEffect, useRef } from "react";
import { chatConnection } from "./chatConnection";
import { ShowMessages } from "./chatFormatting";

chatConnection.connect()

export default function Page() {
  const messageRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'start' })
    }
  }, [ShowMessages()])
    return (
      <div className="min-h-screen max-h-screen scrollbar-hide">
        <ShowMessages/>
        <div className="pt-1" ref={messageRef} />
      </div>
    )
}
