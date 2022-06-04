import { useState, FormEvent } from 'react'

import KakaoMap from './KakaoMap'
import styles from './home.module.scss'

const Home = () => {
  const [inputVal, setInputVal] = useState('')
  const [searchWord, setSearchWord] = useState('')

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setInputVal(e.currentTarget.value)
  }

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault()

    setSearchWord(inputVal)
  }

  return (
    <div className={styles.container}>
      <KakaoMap searchWord={searchWord} />
      <form onSubmit={handleFormSubmit}>
        <input type='text' placeholder='장소를 입력하세요' value={inputVal} onChange={handleInputChange} />
        <button type='submit'>검색</button>
      </form>
    </div>
  )
}

export default Home
