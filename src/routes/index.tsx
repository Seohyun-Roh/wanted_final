import { Routes, Route } from 'react-router-dom'

import styles from './routes.module.scss'
import HomePage from './Home'
import GNB from './_shared/GNB'

const App = () => {
  return (
    <div className={styles.container}>
      <main className={styles.app}>
        <GNB />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/myFavList' element={<div>HH</div>} />
          <Route path='*' element={<div>Not found</div>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
