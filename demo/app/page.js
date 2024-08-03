'use client'

import { useState } from 'react'
import { useUmami } from '../../dist'
import Button from '@/components/Button'
import Image from 'next/image'

export default function Home() {
  const umami = useUmami()

  const [basicEventData, setBasicEventData] = useState({})
  const [customEventData, setCustomEventData] = useState({})

  return (
    <main className="flex min-h-screen max-w-2xl mx-auto flex-col p-5 gap-10 items-center justify-center">
      <Image
        src="/umami.svg"
        width={24}
        height={24}
        className="h-32 w-32"
        alt="Umami Logo"
        priority
      />
      <div className="space-y-5 w-full">
        <div className="border space-y-2.5 w-full rounded-lg p-2.5">
          <Button
            onClick={() => {
              const event = umami.event('Basic Event')
              setBasicEventData(event)
            }}
          >
            Basic Event
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
            Custom Event
          </Button>
          <pre className="border overflow-auto min-h-10 text-sm p-1 text-black rounded-md">
            {JSON.stringify(customEventData, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  )
}
