import React from 'react'
import clsx from 'clsx'

export default function Button({ variant = 'primary', ...props }) {
  return (
    <button
      className={clsx(
        {
          'bg-black text-white': variant === 'primary',
          'bg-brand text-white ': variant === 'brand',
        },
        'flex items-center font-medium justify-center text-sm rounded-md px-3 w-full py-1.5'
      )}
      {...props}
    />
  )
}
