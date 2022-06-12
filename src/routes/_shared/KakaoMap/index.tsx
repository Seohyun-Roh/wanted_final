import { useEffect, useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'

import { useRecoilState } from 'hooks/state'
import { placeListState, selectState } from 'states/place'
import { IPlace } from 'types/place'

import { ArrowIcon } from 'assets/svgs'
import styles from './kakaoMap.module.scss'

interface Iprops {
  searchWord?: string
}

const KakaoMap = ({ searchWord }: Iprops) => {
  const [markers, setMarkers] = useRecoilState(placeListState)
  const [select] = useRecoilState(selectState)

  const [info, setInfo] = useState<IPlace>()
  const [map, setMap] = useState<kakao.maps.Map>()

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }

    const success = (pos: GeolocationPosition) => {
      if (!map) return

      const crd = pos.coords

      const bounds = new kakao.maps.LatLngBounds()
      bounds.extend(new kakao.maps.LatLng(crd.latitude, crd.longitude))

      map.setBounds(bounds)
    }

    const error = () => {
      if (!map) return

      const bounds = new kakao.maps.LatLngBounds()
      bounds.extend(new kakao.maps.LatLng(33.45058, 126.574942))

      map.setBounds(bounds)
    }

    navigator.geolocation.getCurrentPosition(success, error, options)
  }, [map])

  useEffect(() => {
    if (!map || searchWord === '') return

    const ps = new kakao.maps.services.Places()

    ps.keywordSearch(searchWord, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds()
        const tmpMarkers: IPlace[] = []

        data.forEach((datum) => {
          tmpMarkers.push({
            id: datum.id,
            position: {
              lat: Number(datum.y),
              lng: Number(datum.x),
            },
            content: datum.place_name,
            placeUrl: datum.place_url,
            roadAddressName: datum.road_address_name,
            categoryName: datum.category_name,
            categoryGroupName: datum.category_group_name,
            isLiked: false,
          })

          bounds.extend(new kakao.maps.LatLng(Number(datum.y), Number(datum.x)))
        })

        setMarkers(tmpMarkers)
        map.setBounds(bounds)
      }
    })
  }, [map, searchWord, setMarkers])

  return (
    <section>
      <Map
        center={select.center}
        isPanto
        style={{
          width: '100%',
          height: '350px',
        }}
        level={5}
        onCreate={setMap}
      >
        {markers?.map((marker) => (
          <MapMarker key={marker.id} position={marker.position} onClick={() => setInfo(marker)}>
            {info && info.content === marker.content && (
              <div className={styles.infoWindow}>
                {marker.content}
                <a href={marker.placeUrl} target='_blank' rel='noreferrer'>
                  <ArrowIcon width='15px' height='15px' />
                </a>
              </div>
            )}
          </MapMarker>
        ))}
      </Map>
    </section>
  )
}

export default KakaoMap
