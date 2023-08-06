import {createContext, useContext, useEffect, useState, useReducer} from "react";
import {JS} from "json-server/lib/cli/utils/is.js";

const BASE_URL = "http://localhost:5000"
const CityContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {}
}

function CityProvider({children}) {
  const [{cities, isLoading, currentCity}, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    switch (action.type) {
      case 'setIsLoading':
        return {...state, isLoading: action.payload};
      case 'cities/loaded':
        return {...state, cities: action.payload};
      case 'cities/added':
        return {...state, cities: [...state.cities, action.payload]};
      case 'cities/deleted':
        return {...state, cities: action.payload};
      case 'setCurrentCity':
        return {...state, currentCity: action.payload};
      default :
        console.log('Default Case occured!');
    }
  }

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({type: 'setIsLoading', payload: true});
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({
          type: 'cities/loaded',
          payload: data});
      } catch (error) {
        console.log(error);
      } finally {
        dispatch({type: 'setIsLoading', payload: false});
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
      try {
        dispatch({type: 'setIsLoading', payload: true});
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({
          type: 'setCurrentCity',
          payload: data
        });
      } catch (error) {
        console.log(error);
      } finally {
        dispatch({type: 'setIsLoading', payload: false});
      }
  }

  async function addCity(newCity) {
      try {
        dispatch({type: 'setIsLoading', payload: true});
        const res = await fetch(`${BASE_URL}/cities`, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCity)
        });
        const data = await res.json();
        dispatch({
          type: 'cities/added',
          payload: data
        });
      } catch (error) {
        alert('Something went wrong adding the city...');
      } finally {
        dispatch({type: 'setIsLoading', payload: false});
      }
  }

  async function deleteCity(id) {
    try {
      dispatch({type: 'setIsLoading', payload: true});
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE'
      })

      const deleted = cities.filter(city => city.id !== id);
      dispatch({
        type: 'cities/deleted',
        payload: deleted
      });

    } catch (error) {
      alert('Something went wrong deleting the city...');
    } finally {
      dispatch({type: 'setIsLoading', payload: false});
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