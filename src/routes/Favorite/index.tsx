import { useMount } from 'hooks'
import { useRecoil } from 'hooks/state'
import store from 'store'

import { favoriteListState } from 'states/place'
import PlaceCard from 'routes/_shared/PlaceCard'

const Favorite = () => {
  const [favoriteList, setFavoriteList] = useRecoil(favoriteListState)

  useMount(() => {
    setFavoriteList(store.get('favorites') || [])
  })

  return (
    <div>
      <ul>
        {favoriteList?.map((favorite, i) => {
          const key = `favorites-${i}`

          return <PlaceCard key={key} place={favorite} />
        })}
      </ul>
    </div>
  )
}

export default Favorite
