import { atom } from 'hooks/state'
import { IPlace, ISelect } from 'types/place'

export const placeListState = atom<IPlace[]>({
  key: '#placeListState',
  default: [],
})

export const favoriteListState = atom<IPlace[]>({
  key: '#favoriteListState',
  default: [],
})

const INITIAL_SELECT = { center: { lat: 33.45058, lng: 126.574942 } }

export const selectState = atom<ISelect>({
  key: '#selectState',
  default: INITIAL_SELECT,
})
