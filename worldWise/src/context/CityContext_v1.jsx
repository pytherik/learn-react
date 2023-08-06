import {createContext, useContext, useEffect, useState} from "react";
import {JS} from "json-server/lib/cli/utils/is.js";

const BASE_URL = "http://localhost:5000"
const CityContext = createContext();

function CityProvider({children}) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false)
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        setCurrentCity(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false)
      }
  }

  async function addCity(newCity) {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCity)
        });
        const data = await res.json();
        setCities(cities => [...cities, data]);
      } catch (error) {
        alert('Something went wrong adding the city...');
      } finally {
        setIsLoading(false)
      }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true)
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE'
      })
      setCities(cities => cities.filter(city => city.id !== id));
    } catch (error) {
      alert('Something went wrong deleting the city...');
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CityContext.Provider value={{
      cities,
      isLoading,
      currentCity,
      getCity,
      addCity,
      deleteCity
    }}>{children}</CityContext.Provider>
  )
}

function useCities() {
  if(useContext(CityContext) === undefined)
    throw  new Error("CityContext was used outside the CityProvider!");
  return useContext(CityContext);
}

export {CityProvider, useCities};