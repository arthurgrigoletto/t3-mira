import { Gift } from '@prisma/client'

import { GiftActionTypes } from './action'

type GitsState = {
  gifts: Gift[]
  currentGift?: Gift
}

export type GiftAction = {
  type: GiftActionTypes
  payload: unknown
}

const INITIAL_STATE: GitsState = {
  gifts: [],
  currentGift: undefined,
}

export function giftReducer(
  state: GitsState = INITIAL_STATE,
  action: GiftAction,
) {
  return state
}
