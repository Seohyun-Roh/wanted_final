import { ArrowIcon } from 'assets/svgs'
import { useEffect, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { useMount } from 'react-use'

import { IMarker } from 'types/address'

interface Iprops {
  searchWord: string
}

const KakaoMap = ({ searchWord }: Iprops) => {
  const [info, setInfo] = useState<IMarker>()
  const [markers, setMarkers] = useState<IMarker[]>()
  const [map, setMap] = useState<kakao.maps.Map>()

  useEffect(() => {
    if (!map || searchWord === '') return

    const ps = new kakao.maps.services.Places()

    ps.keywordSearch(searchWord, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds()
        const tmpMarkers: IMarker[] = []

        data.forEach((d) => {
          tmpMarkers.push({
            position: {
              lat: Number(d.y),
              lng: Number(d.x),
            },
            content: d.place_name,
            id: d.id,
          })

          bounds.extend(new kakao.maps.LatLng(Number(d.y), Number(d.x)))
        })

        setMarkers(tmpMarkers)
        map.setBounds(bounds)
      }
    })
  }, [map, searchWord])

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
              <div style={{ color: '#000' }}>
                {marker.content}
                <a href={`https://place.map.kakao.com/${marker.id}`} target='_blank' rel='noreferrer'>
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
