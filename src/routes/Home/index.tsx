import { useEffect } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

import { useState } from 'hooks'

import { IMarker } from 'types/address'

const Home = () => {
  const [info, setInfo] = useState<IMarker>()
  const [markers, setMarkers] = useState<IMarker[]>()
  const [map, setMap] = useState({})

  useEffect(() => {
    if (!map) return

    // const container = document.getElementById('map')!
    // const options = {
    //   center: new kakao.maps.LatLng(33.450701, 126.570667),
    //   level: 3,
    // }

    // const tmap = new kakao.maps.Map(container, options)

    const ps = new kakao.maps.services.Places()

    ps.keywordSearch('이태원 맛집', (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds()
        const tmpMarkers: IMarker[] = []

        data.forEach((d, i) => {
          tmpMarkers.push({
            position: {
              lat: Number(d.y),
              lng: Number(d.x),
            },
            content: d.place_name,
          })

          bounds.extend(new kakao.maps.LatLng(Number(d.y), Number(d.x)))
        })

        setMarkers(tmpMarkers)
        // map.setBounds(bounds)
      }
    })
  }, [map])

  return (
    <Map
      center={{
        lat: 37.566826,
        lng: 126.9786567,
      }}
      style={{
        width: '100%',
        height: '350px',
      }}
      level={3}
      onCreate={(m) => setMap(m)}
    >
      {markers?.map((marker) => (
        <MapMarker
          key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
          position={marker.position}
          onClick={() => setInfo(marker)}
        >
          {info && info.content === marker.content && <div style={{ color: '#000' }}>{marker.content}</div>}
        </MapMarker>
      ))}
    </Map>
  )
}

export default Home
