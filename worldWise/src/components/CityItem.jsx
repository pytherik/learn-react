import styles from "./CityItem.module.css";
import {Link} from "react-router-dom";

const formatDate = (date) =>
  new Intl.DateTimeFormat("de", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

function CityItem({city}) {
  const {cityName, date, emoji, id, position} = city;
  return (
    <li>
    <Link to={`${id}?lat=${position.lat}&lng=${position.lng}`} className={styles.cityItem}>
     <span className={styles.emoji}>{emoji}</span>
     <h3 className={styles.name}>{cityName}</h3>
     <time className={styles.date}>{formatDate(date)}</time>
      <button className={styles.deleteBtn}>&times;</button>
    </Link>
    </li>
  );
}

export default CityItem;