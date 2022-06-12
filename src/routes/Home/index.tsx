import { useState, FormEvent } from 'react'
import { useUnmount } from 'react-use'

import { useRecoilState } from 'hooks/state'
import { placeListState } from 'states/place'

import KakaoMap from '../_shared/KakaoMap'
import PlaceCard from '../_shared/PlaceCard'
import { SearchIcon } from 'assets/svgs'
import styles from './home.module.scss'

const Home = () => {
  const [places, setPlaces] = useRecoilState(placeListState)

  const [inputVal, setInputVal] = useState('')
  const [searchWord, setSearchWord] = useState('')

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setInputVal(e.currentTarget.value)
  }

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault()

    setSearchWord(inputVal)
  }

  useUnmount(() => setPlaces([]))

  return (
    <main className={styles.container}>
      <KakaoMap searchWord={searchWord} />
      <form onSubmit={handleFormSubmit}>
        <input
          type='text'
          placeholder='장소 검색'
          className={styles.searchInput}
          value={inputVal}
          onChange={handleInputChange}
        />
        <button type='submit' className={styles.searchBtn}>
          <SearchIcon />
        </button>
      </form>
      <ul>
        {places?.map((place) => (
          <PlaceCard key={place.id} isFavorite={false} place={place} />
        ))}
      </ul>
    </main>
  )
}

export default Home
