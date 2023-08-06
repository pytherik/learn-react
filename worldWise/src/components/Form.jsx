import {useState, useEffect} from "react";

import styles from "./Form.module.css";
import Button from "./Button.jsx";
import BackButton from "../BackButton.jsx";
import {useUrlPosition} from "../hooks/useUrlPosition.js";
import {useCities} from "../context/CityContext.jsx"
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {registerLocale} from "react-datepicker";
import de from 'date-fns/locale/de';
import {useNavigate} from "react-router-dom";

registerLocale('de', de);

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [emoji, setEmoji] = useState("")
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [geocodingError, setGeocodingError] = useState("");
  const {lat, lng} = useUrlPosition();
  const {addCity, isLoading} = useCities();
  const navigate = useNavigate();

  useEffect(() => {
    if (!lat && !lng) return;

    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError("");
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        setCityName(data.city || data.locality);
        setEmoji(convertToEmoji(data.countryCode));
        setCountry(data.countryName);

        if (!data.countryCode)
          throw new Error("There's nothing but water 🙃 Click somewhere else!")
      } catch (error) {
        setGeocodingError(error.message);
        console.log(error);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }

    fetchCityData();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng
      },
    }
    await addCity(newCity);
    navigate("/app/cities");
    console.log(newCity);
  }

  if (isLoading) return <Spinner/>
  if (geocodingError) return <Message message={geocodingError}/>
  if (!lat && !lng) return <Message message="Start by clicking somewhere on the map!"/>

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ''}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName} ({country})?</label>
        <DatePicker selected={date}
                    locale="de"
                    dateFormat="dd.MM.Y"
                    onChange={(date) => setDate(date)}/>
        {/*<input*/}
        {/*  id="date"*/}
        {/*  onChange={(e) => setDate(e.target.value)}*/}
        {/*  value={date}*/}
        {/*/>*/}
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <BackButton/>
      </div>
    </form>
  );
}

export default Form;
