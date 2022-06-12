import { useState } from 'hooks'
import { useRecoil } from 'hooks/state'
import store from 'store'

import { IPlace } from 'types/place'
import { favoriteListState, selectState } from 'states/place'

import { Building, Museum } from 'assets/svgs'
import Cafe from 'assets/images/cafe.png'
import Hotel from 'assets/images/hotel.jpg'
import Restaurant from 'assets/images/restaurant.png'
import Travel from 'assets/images/travel.png'
import styles from './placeCard.module.scss'

interface IProps {
  place: IPlace
}

const PlaceCard = ({ place }: IProps) => {
  const [, setFavoriteList] = useRecoil(favoriteListState)
  const [, setSelect] = useRecoil(selectState)
  const [isIncluded, setIsIncluded] = useState(false)

  const PlaceIcon = () => {
    switch (place.categoryGroupName) {
      case '음식점':
        return <img src={Restaurant} alt='음식점' className={styles.placeIcon} />
      case '관광명소':
        return <img src={Travel} alt='관광명소' className={styles.placeIcon} />
      case '카페':
        return <img src={Cafe} alt='카페' className={styles.placeIcon} />
      case '문화시설':
        return <Museum className={styles.placeIcon} />
      default:
        return <Building className={styles.placeIcon} />
    }
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

  const handleFavoriteClick = () => {
    const favorites = store.get('favorites') ?? []
    let newFavorites

    if (isIncluded) {
      newFavorites = favorites.filter((favorite: { content: string }) => favorite.content !== place.content)
      setIsIncluded(false)
    } else {
      newFavorites = [...favorites, place]
      setIsIncluded(true)
    }

    store.set('favorites', newFavorites)
    setFavoriteList(newFavorites)
  }

  const handleButtonClick = () => {
    window.open(`${place.placeUrl}`, '_blank')
  }

  return (
    <li className={styles.wrapper}>
      <div className={styles.placeInfo}>
        {PlaceIcon()}
        <div>
          <p className={styles.content}>{place.content}</p>
          <p className={styles.categoryName}>{place.categoryName}</p>
          <p className={styles.roadAddressName}>{place.roadAddressName}</p>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <button type='button' className={styles.likeBtn} onClick={handleFavoriteClick}>
          {isIncluded ? '❤️' : '🤍'}
        </button>
        <button type='button' className={styles.infoBtn} onClick={handleButtonClick}>
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
