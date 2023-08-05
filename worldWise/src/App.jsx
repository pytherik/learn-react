// import {useState, useEffect} from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import Homepage from "./pages/Homepage.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login.jsx";
import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";
import {CityProvider} from "./context/CityContext.jsx";

const App = () => {


  return (
    <>
      <CityProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage/>}/>
            <Route path="product" element={<Product/>}/>
            <Route path="pricing" element={<Pricing/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="app" element={<AppLayout/>}>
              <Route index element={<Navigate replace to="cities"/>}/>
              <Route path="cities" element={<CityList/>}/>
              {/*<Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>}/>*/}
              <Route path="cities/:id" element={<City/>}/>
              <Route path="countries" element={<CountryList/>}/>
              {/*<Route path="countries" element={<CountryList cities={cities} isLoading={isLoading}/>}/>*/}
              <Route path="form" element={<Form/>}/>
            </Route>
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
        </BrowserRouter>
      </CityProvider>
    </>
  );
};

export default App;
