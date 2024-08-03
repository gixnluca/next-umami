import React from 'react'

export default function Button({
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="bg-black w-full text-white rounded-md py-2 px-3"
      {...props}
    />
  )
}
