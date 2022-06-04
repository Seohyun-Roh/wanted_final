import { useState, FormEvent } from 'react'

import { useRecoilState } from 'hooks/state'
import { placeListState } from 'states/place'

import KakaoMap from './KakaoMap'
import { SearchIcon } from 'assets/svgs'
import styles from './home.module.scss'
import PlaceCard from 'routes/_shared/PlaceCard'
import { useUnmount } from 'react-use'

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
    <div className={styles.container}>
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
        {places?.map((place, i) => {
          const key = `searchResults-${i}`
          return <PlaceCard key={key} place={place} />
        })}
      </ul>
    </div>
  )
}

export default Home
