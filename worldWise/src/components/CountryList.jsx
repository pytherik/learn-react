import styles from "./CountryList.module.css";
import Spinner from "./Spinner.jsx";
import CountryItem from "./CountryItem.jsx";
import Message from "./Message.jsx";

function CountryList({cities, isLoading}) {
  const countries = cities.reduce((acc, city) => {
    if (!acc.map(el => el.country).includes(city.country)){
      return [...acc, {country: city.country, emoji: city.emoji}]
    } else return acc;
  }, []);

  console.log(countries);
  if(isLoading) return <Spinner />;
  if(!countries.length) return <Message message='Add your first country by clicking on a country on the map'/>;
  return (
    <div>
      <ul className={styles.cityList}>
        {countries.map(country => <CountryItem country={country} key={country}/>)}
      </ul>
    </div>
  );
}

export default CountryList;