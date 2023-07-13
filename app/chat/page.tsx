'use client'
import { chatConnection } from "./chatConnection";
import { ShowMessages } from "./chatFormatting";

chatConnection.connect()

export default function Page() {
    return (
      <div className="min-h-screen max-h-screen">
        <ShowMessages/>
      </div>
    )
}
