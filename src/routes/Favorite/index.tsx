import { useEffect, useMount, useState } from 'hooks'
import { useRecoilState } from 'hooks/state'
import { Link } from 'react-router-dom'
import store from 'store'

import { favoriteListState, placeListState } from 'states/place'
import { IPlace } from 'types/place'

import PlaceCard from 'routes/_shared/PlaceCard'
import KakaoMap from 'routes/_shared/KakaoMap'
import DropDown from 'routes/_shared/DropDown'
import styles from './favorite.module.scss'

const PLACE_CATEGORIES = ['전체', '음식점', '관광명소', '카페', '숙박', '문화시설', '기타']

const Favorite = () => {
  const [favoriteList, setFavoriteList] = useRecoilState(favoriteListState)
  const [, setMarkers] = useRecoilState(placeListState)

  const [filteredPlace, setFilteredPlace] = useState<IPlace[]>()
  const [currentCategory, setCurrentCategory] = useState('전체')

  useMount(() => {
    const savedFavoriteList = store.get('favorites') || []
    setFavoriteList(savedFavoriteList)
    setMarkers(savedFavoriteList)
  })

  useEffect(() => {
    let newPlaces

    switch (currentCategory) {
      case '전체': {
        newPlaces = store.get('favorites')
        break
      }
      case '음식점':
      case '관광명소':
      case '카페':
      case '숙박':
      case '문화시설': {
        newPlaces = favoriteList.filter((favorite) => favorite.categoryGroupName === currentCategory)
        break
      }
      case '기타': {
        newPlaces = favoriteList.filter((favorite) => {
          return (
            favorite.categoryGroupName !== '음식점' &&
            favorite.categoryGroupName !== '관광명소' &&
            favorite.categoryGroupName !== '카페' &&
            favorite.categoryGroupName !== '숙박' &&
            favorite.categoryGroupName !== '문화시설'
          )
        })
        break
      }
    }

    setFilteredPlace(newPlaces)
  }, [currentCategory])

  return (
    <section className={styles.container}>
      <KakaoMap />
      <div className={styles.contents}>
        {favoriteList.length === 0 ? (
          <div className={styles.noFavList}>
            아직 즐겨찾기가 없습니다.
            <br />
            즐겨찾기를 추가해보세요! 😊
            <button type='button' className={styles.goHomeBtn}>
              <Link to='/'>추가하러 가기</Link>
            </button>
          </div>
        ) : (
          <>
            <DropDown selectList={PLACE_CATEGORIES} setCurrentSelect={setCurrentCategory} size='small'>
              {currentCategory}
            </DropDown>
            <ul>
              {filteredPlace?.map((favorite) => (
                <PlaceCard key={favorite.id} isFavorite place={favorite} />
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  )
}

export default Favorite
