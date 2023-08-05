import {createContext, useContext, useEffect, useState} from "react";

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

  return (
    <CityContext.Provider value={{
      cities,
      isLoading,
      currentCity,
      getCity,
    }}>{children}</CityContext.Provider>
  )
}

function useCities() {
  if(useContext(CityContext) === undefined)
    throw  new Error("CityContext was used outside the CityProvider!");
  return useContext(CityContext);
}

export {CityProvider, useCities};