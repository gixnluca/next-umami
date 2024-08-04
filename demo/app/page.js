'use client'

import { useState } from 'react'
import { useUmami } from 'next-umami'
import Button from '@/components/Button'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const umami = useUmami()

  const [basicEventData, setBasicEventData] = useState({})
  const [customEventData, setCustomEventData] = useState({})

  return (
    <main className="flex min-h-screen max-w-2xl mx-auto flex-col p-5 gap-10 items-center justify-center">
      <div className="flex flex-col md:flex-row items-center gap-10">
        <Image
          src="/umami.svg"
          width={24}
          height={24}
          className="h-32 w-32"
          alt="Umami Logo"
          priority
        />
        <h1 className="text-3xl md:text-4xl text-center md:text-left font-semibold">
          Simple integration for{' '}
          <Link
            className="text-brand"
            href="https://nextjs.org/docs"
            target="_blank"
          >
            Next.js
          </Link>{' '}
          and{' '}
          <Link className="text-brand" href="https://umami.is" target="_blank">
            Umami Analytics
          </Link>
        </h1>
      </div>
      <div className="flex text-lg gap-2.5">
        <Link href="https://github.com/gixnluca/next-umami" target="_blank">
          GitHub
        </Link>
        <Link href="https://www.npmjs.com/package/next-umami" target="_blank">
          NPM
        </Link>
        <Link
          href="https://eu.umami.is/share/4S76ewS0dKoJ8841/next-umami.vercel.app"
          target="_blank"
        >
          Umami Dashboard for this page
        </Link>
      </div>
      <div className="space-y-5 w-full">
        <div className="border space-y-2.5 w-full rounded-lg p-2.5">
          <Button
            onClick={() => {
              const event = umami.event('Basic Event')
              setBasicEventData(event)
            }}
          >
            Send Basic Event
          </Button>
          <pre className="border overflow-auto min-h-10 text-sm p-1 text-black rounded-md">
            {JSON.stringify(basicEventData, null, 2)}
          </pre>
        </div>
        <div className="border space-y-2.5 w-full rounded-lg p-2.5">
          <Button
            onClick={() => {
              const event = umami.event('Custom Event', {
                userAgent: window.navigator.userAgent,
              })
              setCustomEventData(event)
            }}
          >
            Send Custom Event
          </Button>
          <pre className="border overflow-auto min-h-10 text-sm p-1 text-black rounded-md">
            {JSON.stringify(customEventData, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  )
}
