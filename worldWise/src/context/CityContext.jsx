import {createContext, useContext, useEffect, useState, useReducer} from "react";
import {JS} from "json-server/lib/cli/utils/is.js";

const BASE_URL = "http://localhost:5000"
const CityContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: ""
}

function CityProvider({children}) {
  const [{cities, isLoading, currentCity}, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    switch (action.type) {
      case 'loading':
        return {...state, isLoading: true};
      case 'cities/loaded':
        return {
          ...state,
          isLoading: false,
          cities: action.payload
        };
      case 'city/loaded':
        return {
          ...state,
          isLoading: false,
          currentCity: action.payload
        };
      case 'city/added':
        return {
          ...state,
          isLoading: false,
          cities: [...state.cities, action.payload],
          currentCity: action.payload
        };
      case 'city/deleted':
        return {
          ...state,
          isLoading: false,
          cities: state.cities.filter(city => city.id !== action.payload),
          currentCity: {}
        }

      case 'rejected':
        return {
          ...state,
          isLoading: false,
          error: action.payload
        }
      default :
        console.log('Default Case occured!');
    }
  }

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({type: 'loading'});
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({
          type: 'cities/loaded',
          payload: data
        });
      } catch {
        dispatch({type: 'rejected', payload: "Error in fetchCities..."})
      }
    }

    fetchCities();
  }, []);

  async function getCity(id) {
    if (+id === currentCity.id) return;
    try {
      dispatch({type: 'loading'});
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({
        type: 'city/loaded',
        payload: data
      });
    } catch {
      dispatch({type: 'rejected', payload: "Error in getCity..."})
    }
  }

  async function addCity(newCity) {
    try {
      dispatch({type: 'loading'});
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newCity)
      });
      const data = await res.json();
      dispatch({
        type: 'city/added',
        payload: data
      });
    } catch {
      dispatch({type: 'rejected', payload: "Error in addCity..."})
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({type: 'loading'});
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE'
      })

      dispatch({
        type: 'city/deleted',
        payload: id
      });

    } catch {
      dispatch({type: 'rejected', payload: "Error in deleteCity..."})
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
  if (useContext(CityContext) === undefined)
    throw new Error("CityContext was used outside the CityProvider!");
  return useContext(CityContext);
}

export {CityProvider, useCities};