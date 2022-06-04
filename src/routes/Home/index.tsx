import { useState, FormEvent } from 'react'

import { useRecoilState } from 'hooks/state'
import { placeListState } from 'states/place'

import KakaoMap from './KakaoMap'
import styles from './home.module.scss'
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
          검색
        </button>
      </form>
    </div>
  )
}

export default Home
