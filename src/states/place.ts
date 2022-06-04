import { atom } from 'hooks/state'
import { IPlace } from 'types/place'

export const placeListState = atom<IPlace[]>({
  key: '#placeListState',
  default: [],
})

export const favoriteListState = atom<IPlace[]>({
  key: '#favoriteListState',
  default: [],
})
