import { Routes, Route } from 'react-router-dom'

import styles from './routes.module.scss'
import Home from './Home'
import GNB from './_shared/GNB'
import Favorite from './Favorite'

const App = () => {
  return (
    <div className={styles.container}>
      <main className={styles.app}>
        <GNB />
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
