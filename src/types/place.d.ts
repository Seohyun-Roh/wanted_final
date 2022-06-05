export interface IPlace {
  position: {
    lat: number
    lng: number
  }
  content: string
  placeUrl: string
  roadAddressName: string
  categoryName: string
  categoryGroupName: string
}

export interface ISelect {
  center: {
    lat: number
    lng: number
  }
}
