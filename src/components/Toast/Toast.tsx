import { XCircle, CheckCircle } from '@phosphor-icons/react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { clsx } from 'clsx'

import { ToastType, useToast } from './store'

const icons = {
  [ToastType.ERROR]: <XCircle size={36} />,
  [ToastType.SUCCESS]: <CheckCircle size={36} />,
}

export function Toast() {
  const { messages, removeToast } = useToast()

  return (
    <ToastPrimitive.Provider>
      <ToastPrimitive.Viewport className="fixed bottom-0 right-0 w-full p-4 md:w-fit">
        {messages.map((toast) => {
          return (
            <ToastPrimitive.Root
              key={toast.id}
              className={clsx(
                'mb-4 flex items-center border-2 border-solid p-4 text-sm font-bold last:mb-0 md:rounded-2xl md:p-6 md:text-base',
                {
                  'border-success-pure bg-success-light fill-success-pure text-success-pure':
                    toast.type === ToastType.SUCCESS,
                  'border-helper-pure bg-helper-light fill-helper-pure text-helper-pure':
                    toast.type === ToastType.ERROR,
                },
              )}
              onClick={() => removeToast(toast.id)}
              onOpenChange={(open) => {
                if (!open) {
                  removeToast(toast.id)
                }
              }}
            >
              <ToastPrimitive.Title className="flex items-center gap-2">
                {icons[toast.type]}
                {toast.title}
              </ToastPrimitive.Title>
            </ToastPrimitive.Root>
          )
        })}
      </ToastPrimitive.Viewport>
    </ToastPrimitive.Provider>
  )
}
