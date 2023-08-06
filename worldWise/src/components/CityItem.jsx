import styles from "./CityItem.module.css";
import {Link} from "react-router-dom";
import {useCities} from "../context/CityContext.jsx";

const formatDate = (date) =>
  new Intl.DateTimeFormat("de", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));


function CityItem({city}) {
  const {currentCity, deleteCity} = useCities();
  const {cityName, date, emoji, id, position} = city;

  function handleDelete(e) {
    e.preventDefault();
    deleteCity(city.id);
  }

  return (
    <li>
    <Link to={`${id}?lat=${position.lat}&lng=${position.lng}`}
          className={`${styles.cityItem} 
          ${id === currentCity.id ? styles['cityItem--active'] : ''}`}>
     <span className={styles.emoji}>{emoji}</span>
     <h3 className={styles.name}>{cityName}</h3>
     <time className={styles.date}>{formatDate(date)}</time>
      <button className={styles.deleteBtn} onClick={handleDelete}>&times;</button>
    </Link>
    </li>
  );
}

export default CityItem;