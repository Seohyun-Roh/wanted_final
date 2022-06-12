import { Routes, Route } from 'react-router-dom'

import Home from './Home'
import GNB from './_shared/GNB'
import Favorite from './Favorite'
import styles from './routes.module.scss'

const App = () => {
  return (
    <div className={styles.container}>
      <GNB />
      <main className={styles.app}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/myFavList' element={<Favorite />} />
          <Route path='*' element={<div>Not found</div>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
