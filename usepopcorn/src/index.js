// import { useState } from 'react';
// import StarRating from "./components/StarRating";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';

// const OutsideComponent = () => {
//   const [movieRating, setMovieRating] = useState(0);
//   return (
//     <>
//       <StarRating onRateChange={ setMovieRating } />
//     <p>Du hast { movieRating } Sterne vergeben.</p>
//     </>
//   )
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/*<StarRating messages={*/}
    {/*  [*/}
    {/*    'ohne Bewertung',*/}
    {/*    'ärgerlich',*/}
    {/*    'schlecht',*/}
    {/*    'geht so',*/}
    {/*    'gut',*/}
    {/*    'sehr gut'*/}
    {/*]}*/}
    {/*            defaultRating={ 3 }/>*/}
    {/*<OutsideComponent />*/}
  </React.StrictMode>
);

