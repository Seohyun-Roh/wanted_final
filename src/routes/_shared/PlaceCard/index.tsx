import { IPlace } from 'types/place'
import { Building, Museum } from 'assets/svgs'
import Cafe from 'assets/images/cafe.png'
import Hotel from 'assets/images/hotel.jpg'
import Restaurant from 'assets/images/restaurant.png'
import Travel from 'assets/images/travel.png'
import styles from './placeCard.module.scss'

interface IProps {
  place: IPlace
}

const PlaceCard = ({ place }: IProps) => {
  const PlaceIcon = {
    음식점: <img src={Restaurant} alt='음식점' className={styles.placeIcon} />,
    관광명소: <img src={Travel} alt='관광명소' className={styles.placeIcon} />,
    카페: <img src={Cafe} alt='카페' className={styles.placeIcon} />,
    숙박: <img src={Hotel} alt='숙박' className={styles.placeIcon} />,
    문화시설: <Museum className={styles.placeIcon} />,
  }[place.categoryGroupName] ?? <Building className={styles.placeIcon} />

  const handleButtonClick = () => {
    window.open(`${place.placeUrl}`, '_blank')
  }

  return (
    <li className={styles.wrapper}>
      <div className={styles.placeInfo}>
        {PlaceIcon}
        <div>
          <p className={styles.content}>{place.content}</p>
          <p className={styles.categoryName}>{place.categoryName}</p>
          <p className={styles.roadAddressName}>{place.roadAddressName}</p>
        </div>
      </div>
      <button type='button' className={styles.linkBtn} onClick={handleButtonClick}>
        정보 보기
      </button>
    </li>
  )
}

export default PlaceCard
