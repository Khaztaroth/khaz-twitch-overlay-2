'use client'

import Link from "next/link"

export default function Home() {

  return (
    <div>
      <ul>
      <li><Link href="/chat">Chat page</Link></li>
      <li><Link href="/scenes/gaming">Games Overlay</Link></li>
      <li><Link href="/scenes/art">Art Overlay</Link></li>
      <li><Link href="/scenes/custom">Custom Overlay</Link></li>
      </ul>
    </div>
  )
}
