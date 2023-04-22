import { create } from 'zustand'
import { v4 as uuid } from 'uuid'

export enum ToastType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

type ToastMessage = {
  id: string
  type: ToastType
  title: string
  description?: string
}

type ToastState = {
  messages: Array<ToastMessage>
  addToast: (message: Omit<ToastMessage, 'id'>) => void
  removeToast: (id: string) => void
}

export const useToast = create<ToastState>((set) => ({
  messages: [],
  addToast({ title, type, description }) {
    const id = uuid()

    const toast = {
      id,
      title,
      type,
      description,
    }

    return set((state) => ({ messages: [...state.messages, toast] }))
  },
  removeToast(id) {
    return set((state) => ({
      messages: state.messages.filter((message) => message.id !== id),
    }))
  },
}))
