import { useState } from "react";
import { tempWatchedData, tempMovieData } from "./components/movieData";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import NumResults from "./components/NumResults";


const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);



const Button = ({ isOpen, setIsOpen }) => {
  return (
    <button
      className="btn-toggle"
      onClick={() => setIsOpen((open) => !open)}
    >
      {isOpen ? "–" : "+"}
    </button>
  )
}

const WatchedSummary = ({ watched }) => {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  )
}

const WatchedMovie = ({ movie }) => {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  )
}

const WatchedMoviesList = ({ watched }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={ movie } key={movie.imdbID} />
       ))}
    </ul>
  )
}

const MovieList = ({ movies }) => {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={ movie } />
      ))}
    </ul>
  )
}

const Movie = ({ movie }) => {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  )
}


const Box = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <Button isOpen={ isOpen } setIsOpen={ setIsOpen } />
      {isOpen && children }
    </div>
  )
}


const Main = ({ children }) => {
  return (
    <main className="main">
      { children }
    </main>
  )
}

export default function App() {
  const [watched, setWatched] = useState(tempWatchedData);
  const [movies, setMovies] = useState(tempMovieData);
  return (
    <>
      <Navbar>
        <Search />
        <NumResults movies={ movies } />
      </Navbar>
      <Main>
        {/*info explicit composing using an element*/}

        {/*<Box element={ <MovieList movies={movies} /> }/>*/}
        {/*<Box element={*/}
        {/*  <>*/}
        {/*    <WatchedSummary watched={ watched } />*/}
        {/*    <WatchedMoviesList watched={ watched } />*/}
        {/*  </>*/}
        {/*}*/}
        {/*/>*/}

        {/*info implicit composing using children*/}

        <Box>
          <MovieList movies={ movies } />
        </Box>
        <Box>
          <WatchedSummary watched={ watched } />
          <WatchedMoviesList watched={ watched } />
        </Box>
      </Main>
     </>
  );
}


// const WatchedBox = ({ children }) => {
//   const [isOpen2, setIsOpen2] = useState(true);
//   return (
//     <div className="box">
//       <Button isOpen={ isOpen2 } setIsOpen={ setIsOpen2 } />
//       {isOpen2 && children }
//     </div>
//   )
// }
//
// const ListBox = ({ children }) => {
//   const [isOpen1, setIsOpen1] = useState(true);
//   return (
//     <div className="box">
//       <Button isOpen={ isOpen1 } setIsOpen={ setIsOpen1 } />
//       { isOpen1 && children }
//     </div>
//   )
// }
