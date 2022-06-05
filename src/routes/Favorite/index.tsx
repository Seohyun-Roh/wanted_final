import { useMount } from 'hooks'
import { useRecoilState } from 'hooks/state'
import { Link } from 'react-router-dom'
import store from 'store'

import { favoriteListState, placeListState } from 'states/place'
import PlaceCard from 'routes/_shared/PlaceCard'
import KakaoMap from 'routes/_shared/KakaoMap/KakaoMap'
import styles from './favorite.module.scss'

const Favorite = () => {
  const [favoriteList, setFavoriteList] = useRecoilState(favoriteListState)
  const [, setMarkers] = useRecoilState(placeListState)

  useMount(() => {
    const favorites = store.get('favorites') || []
    setFavoriteList(favorites)
    setMarkers(favorites)
  })

  return (
    <div className={styles.container}>
      <KakaoMap />
      <ul>
        {favoriteList?.map((favorite, i) => {
          const key = `favorites-${i}`
          return <PlaceCard key={key} place={favorite} />
        })}
      </ul>
      {favoriteList.length === 0 && (
        <div className={styles.noFavList}>
          아직 즐겨찾기가 없습니다.
          <br />
          즐겨찾기를 추가해보세요! 😊
          <button type='button' className={styles.goHomeBtn}>
            <Link to='/'>추가하러 가기</Link>
          </button>
        </div>
      )}
    </div>
  )
}

export default Favorite
