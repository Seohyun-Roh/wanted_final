export interface IPlace {
  id: string
  position: {
    lat: number
    lng: number
  }
  content: string
  placeUrl: string
  roadAddressName: string
  categoryName: string
  categoryGroupName: string
  isLiked: boolean
}

export interface ISelect {
  center: {
    lat: number
    lng: number
  }
}
