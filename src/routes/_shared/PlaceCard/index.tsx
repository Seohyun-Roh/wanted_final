import { useRecoilState } from 'hooks/state'
import store from 'store'

import { IPlace } from 'types/place'
import { placeListState, favoriteListState, selectState } from 'states/place'

import { Building, Museum } from 'assets/svgs'
import { Cafe, Hotel, Restaurant, Travel } from 'assets/images'
import styles from './placeCard.module.scss'

interface IProps {
  place: IPlace
  isFavorite: boolean
}

const PlaceCard = ({ place, isFavorite }: IProps) => {
  const [placeList, setPlaceList] = useRecoilState(placeListState)
  const [, setFavoriteList] = useRecoilState(favoriteListState)
  const [, setSelect] = useRecoilState(selectState)

  const handleFavoriteClick = (id: string) => () => {
    const savedFavoriteList = store.get('favorites') ?? []
    const filteredFavoriteList = savedFavoriteList.filter((p: IPlace) => p.id !== id)
    let newFavoriteList = filteredFavoriteList

    if (isFavorite) {
      setFavoriteList(newFavoriteList)
    } else {
      const newPlace = { ...place, isLiked: !place.isLiked }

      if (newPlace.isLiked) {
        newFavoriteList = filteredFavoriteList.concat(newPlace)
      } else {
        newFavoriteList = filteredFavoriteList
      }

      const newPlaceList = placeList.map((p) => {
        if (p.id === id) return { ...p, isLiked: !place.isLiked }
        return p
      })

      setPlaceList(newPlaceList)
    }

    store.set('favorites', newFavoriteList)
  }

  const handleInfoClick = () => {
    window.open(`${place.placeUrl}`, '_blank')
  }

  const handleItemClick = () => {
    const center = {
      center: {
        lat: place.position.lat,
        lng: place.position.lng,
      },
    }
    setSelect(center)
  }

  return (
    <li className={styles.wrapper}>
      <div className={styles.placeInfo}>
        {(place.categoryGroupName === '음식점' && <img src={Restaurant} alt='음식점' className={styles.placeIcon} />) ||
          (place.categoryGroupName === '관광명소' && (
            <img src={Travel} alt='관광명소' className={styles.placeIcon} />
          )) ||
          (place.categoryGroupName === '카페' && <img src={Cafe} alt='카페' className={styles.placeIcon} />) ||
          (place.categoryGroupName === '숙박' && <img src={Hotel} alt='숙박' className={styles.placeIcon} />) ||
          (place.categoryGroupName === '문화시설' && <Museum className={styles.placeIcon} />) || (
            <Building className={styles.placeIcon} />
          )}
        <div>
          <p className={styles.content}>{place.content}</p>
          <p className={styles.categoryName}>{place.categoryName}</p>
          <p className={styles.roadAddressName}>{place.roadAddressName}</p>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <button type='button' className={styles.likeBtn} onClick={handleFavoriteClick(place.id)}>
          {place.isLiked ? '❤️' : '🤍'}
        </button>
        <button type='button' className={styles.infoBtn} onClick={handleInfoClick}>
          정보 보기
        </button>
        <button type='button' className={styles.infoBtn} onClick={handleItemClick}>
          위치 보기
        </button>
      </div>
    </li>
  )
}

export default PlaceCard
