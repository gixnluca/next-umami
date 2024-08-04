import React from 'react'
import clsx from 'clsx'

export default function Button({ variant = 'primary', ...props }) {
  return (
    <button
      className={clsx(
        {
          'bg-black text-white': variant === 'primary',
          'bg-white text-white ': variant === 'secondary',
          'bg-brand text-white ': variant === 'brand',
        },
        'flex items-center font-medium justify-center rounded-md py-2 px-3 w-full'
      )}
      {...props}
    />
  )
}
