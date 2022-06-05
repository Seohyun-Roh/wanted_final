import cx from 'classnames'
import { NavLink } from 'react-router-dom'

import styles from './gnb.module.scss'

const GNB = () => {
  return (
    <nav className={styles.gnb}>
      <ul>
        <li>
          <NavLink to='/' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            <p>MAIN</p>
          </NavLink>
        </li>
        <li>
          <NavLink to='/myFavList' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
            <p>FAVORITE</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default GNB
