'use client'

import Link from "next/link"

export default function Home() {

  return (
    <div>
      <ul>
      <li><Link href="/chat">Chat page</Link></li>
      <li><Link href="/overlay">Overlay page</Link></li>
      </ul>
    </div>
  )
}
