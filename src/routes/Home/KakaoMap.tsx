import { useEffect, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

import { useRecoilState } from 'hooks/state'
import { placeListState } from 'states/place'

import { IPlace } from 'types/place'
import { ArrowIcon } from 'assets/svgs'

interface Iprops {
  searchWord: string
}

const KakaoMap = ({ searchWord }: Iprops) => {
  const [markers, setMarkers] = useRecoilState(placeListState)

  const [info, setInfo] = useState<IPlace>()
  const [map, setMap] = useState<kakao.maps.Map>()

  useEffect(() => {
    if (!map || searchWord === '') return

    const ps = new kakao.maps.services.Places()

    ps.keywordSearch(searchWord, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds()
        const tmpMarkers: IPlace[] = []

        data.forEach((d) => {
          tmpMarkers.push({
            position: {
              lat: Number(d.y),
              lng: Number(d.x),
            },
            content: d.place_name,
            placeUrl: d.place_url,
            roadAddressName: d.road_address_name,
            categoryName: d.category_name,
            categoryGroupName: d.category_group_name,
          })

          bounds.extend(new kakao.maps.LatLng(Number(d.y), Number(d.x)))
        })

        setMarkers(tmpMarkers)
        map.setBounds(bounds)
      }
    })
  }, [map, searchWord, setMarkers])

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }

    function success(pos: GeolocationPosition) {
      if (!map) return

      const crd = pos.coords

      const bounds = new kakao.maps.LatLngBounds()
      bounds.extend(new kakao.maps.LatLng(crd.latitude, crd.longitude))

      map.setBounds(bounds)
    }

    function error(err: GeolocationPositionError) {
      console.warn(`ERROR(${err.code}): ${err.message}`)
    }

    navigator.geolocation.getCurrentPosition(success, error, options)
  }, [map])

  return (
    <div>
      <Map
        center={{
          lat: 33.450701,
          lng: 126.570667,
        }}
        style={{
          width: '100%',
          height: '350px',
        }}
        level={3}
        onCreate={setMap}
      >
        {markers?.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => setInfo(marker)}
          >
            {info && info.content === marker.content && (
              <div>
                {marker.content}
                <a href={marker.placeUrl} target='_blank' rel='noreferrer'>
                  <ArrowIcon width='15px' height='15px' />
                </a>
              </div>
            )}
          </MapMarker>
        ))}
      </Map>
    </div>
  )
}

export default KakaoMap
