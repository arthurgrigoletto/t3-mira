import { clsx } from 'clsx'
import { ButtonHTMLAttributes } from 'react'

type PaginationItemProps = {
  isActive?: boolean
  isCompleted?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export function PaginationItem({
  children,
  isActive,
  isCompleted,
  ...props
}: PaginationItemProps) {
  return (
    <div className="flex items-center">
      <button
        className={clsx(
          'flex h-8 w-8 items-center justify-center rounded-full border bg-neutral-high-pure text-sm font-semibold text-neutral-low-pure disabled:cursor-not-allowed',
          {
            'border-primary-pure bg-primary-light text-primary-pure disabled:border-transparent disabled:bg-neutral-low-light disabled:text-neutral-high-pure':
              isActive || isCompleted,
          },
        )}
        {...props}
      >
        {children}
      </button>
    </div>
  )
}
