import React from "react";
import {useState, useEffect, useRef} from "react";

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

function Input({location, onLocationChange}){
    return (
      <div>
        <input type="text"
               placeholder="Search from location..."
               value={location}
               onChange={(e) => onLocationChange(e.target.value)}/>
      </div>
    )
}

function Weather({weather, location}) {

    const {
      temperature_2m_max: max,
      temperature_2m_min: min,
      time: dates,
      weathercode: codes,
    } = weather;

    return (
      <div>
        <h2>Weather {location}</h2>
        <ul className="weather">
          {dates.map((date, idx) =>
            <Day
            date={dates.at(idx)}
            min={min.at(idx)}
            max={max.at(idx)}
            code={codes.at(idx)}
            isToday={idx === 0}
            key={date}/>)}
        </ul>
      </div>
    )
}

function Day({date, min, max, code, isToday}) {

    return (
      <li className="day">
        <span>{getWeatherIcon(code)}</span>
        <p>{isToday ? 'Today' : formatDay(date)}</p>
        <p>{Math.floor(min)}&deg; &mdash; <strong>{Math.ceil(max)}&deg;</strong></p>
      </li>
    );
}

function App() {
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [displayLocation, setDisplayLocation] = useState("");
  const [weather, setWeather] = useState({});
  const prevLocation = useRef(location);

  const fetchWeather = async () => {
    if (location.length < 2) return setWeather({});
    try {
      setIsLoading(true);
      // 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
      );
      const geoData = await geoRes.json();
      // console.log(geoData);

      if (!geoData.results) throw new Error("Location not found");

      const {latitude, longitude, timezone, name, country_code} =
        geoData.results.at(0);
      setDisplayLocation(`${name} ${convertToFlag(country_code)}`);

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      setWeather(weatherData.daily);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setLocation(localStorage.getItem("location") || "");
    console.log(location, prevLocation.current)
    if (location !== prevLocation.current) {
      localStorage.setItem('location', location);
      prevLocation.current = location;
    }
  }, [location]);

    return (
      <div className='app'>
        <h1>Classy Weather</h1>
        <Input onLocationChange={setLocation}/>
        {isLoading &&
          <p className="loader">
            Loading...
          </p>}
        {weather.weathercode && <Weather
          weather={weather}
          location={displayLocation}/>}
      </div>
    )
}

export default App;
