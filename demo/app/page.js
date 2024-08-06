'use client'

import { useEffect, useState } from 'react'
import { useUmami } from 'next-umami'
import Button from '@/components/Button'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const umami = useUmami()

  const [basicEventData, setBasicEventData] = useState({})
  const [customEventData, setCustomEventData] = useState({})
  const [customPageviewData, setCustomPageviewData] = useState({})

  useEffect(() => {
    umami.pageView()
  }, [])

  return (
    <main className="flex min-h-screen max-w-2xl mx-auto flex-col p-10 md:px-0 gap-10 items-center justify-center">
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
        <div className="space-y-2.5">
          <h3 className="font-semibold leading-none text-xl">Pageviews</h3>
          <p className="font-light ml-0.5">
            A basic <span className="font-medium">Pageview</span> event is
            automatically sent when visiting this page.
          </p>
          <div className="border space-y-2.5 w-full rounded-lg p-2.5">
            <code className="select-all w-full inline-flex bg-white text-sm border text-black rounded-md p-2.5">
              <span>
                umami.<span className="text-brand">pageView</span>({'{ '}
                <span className="text-sky-500">url</span>:{' '}
                <span className="text-green-500">'/custom-pageview'</span>
                {' }) '}
              </span>
            </code>
            <pre className="border text-sm overflow-auto min-h-10 p-1 text-black rounded-md">
              {JSON.stringify(customPageviewData, null, 2)}
            </pre>
            <Button
              onClick={() => {
                const pageView = umami.pageView({ url: '/custom-pageview' })
                setCustomPageviewData({ ...pageView, website: '***' })
              }}
            >
              Send Custom Pageview
            </Button>
          </div>
        </div>
        <hr />
        <div className="space-y-2.5">
          <h3 className="font-semibold leading-none text-xl">Events</h3>
          <div className="border space-y-2.5 w-full rounded-lg p-2.5">
            <code className="select-all w-full inline-flex bg-white text-sm border text-black rounded-md p-2.5">
              <span>
                umami.<span className="text-brand">event</span>(
                <span className="text-green-500">'Basic Event'</span>)
              </span>
            </code>
            <pre className="border text-sm overflow-auto min-h-10 p-1 text-black rounded-md">
              {JSON.stringify(basicEventData, null, 2)}
            </pre>
            <Button
              onClick={() => {
                const event = umami.event('Basic Event')
                setBasicEventData(event)
              }}
            >
              Send Basic Event
            </Button>
          </div>
          <div className="border space-y-2.5 w-full rounded-lg p-2.5">
            <code className="select-all w-full inline-flex bg-white text-sm border text-black rounded-md p-2.5">
              <span>
                umami.<span className="text-brand">event</span>(
                <span className="text-green-500">'Custom Event'</span>,{' { '}
                <span className="text-sky-500">userAgent</span>:{' '}
                <span className="text-sky-500">
                  <span className="text-amber-400 italic">window</span>
                  .navigator.userAgent
                </span>
                {' }) '}
              </span>
            </code>
            <pre className="border overflow-auto min-h-10 text-sm p-1 text-black rounded-md">
              {JSON.stringify(customEventData, null, 2)}
            </pre>
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
          </div>
        </div>
      </div>
    </main>
  )
}
