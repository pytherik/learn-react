import styles from "./CountryList.module.css";
import Spinner from "./Spinner.jsx";
import CountryItem from "./CountryItem.jsx";
import Message from "./Message.jsx";
import {useCities} from "../context/CityContext.jsx";

function CountryList() {
  const {cities, isLoading} = useCities();
  const countries = cities.reduce((acc, city) => {
    if (!acc.map(el => el.country).includes(city.country)){
      return [...acc, {country: city.country, emoji: city.emoji}]
    } else return acc;
  }, []);

  if(isLoading) return <Spinner />;
  if(!countries.length) return <Message message='Add your first country by clicking on a country on the map'/>;
  return (
      <ul className={styles.countryList}>
        {countries.map(country => <CountryItem country={country} key={country.country}/>)}
      </ul>
  );
}

export default CountryList;