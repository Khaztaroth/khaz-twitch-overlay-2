'use client'

import Link from "next/link"

export default function Home() {

  return (
    <div>
      <ul>
      <li><Link href="/chat">Chat page</Link></li>
      <li><Link href="/overlay/gaming">Games Overlay</Link></li>
      <li><Link href="/overlay/art">Art Overlay</Link></li>
      </ul>
    </div>
  )
}
