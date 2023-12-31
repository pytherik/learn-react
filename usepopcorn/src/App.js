import {useState, useEffect, useRef} from "react";
// import {tempWatchedData, tempMovieData} from "./components/movieData";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import {KEY} from "./config";
import StarRating from "./components/StarRating";
import {useMovies} from "./components/useMovies";
import {useLocalStorageState} from "./components/useLocalStorageState";
import {useKey} from "./components/useKey";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0).toFixed(1);


const Button = ({isOpen, setIsOpen}) => {
  return (
    <button
      className="btn-toggle"
      onClick={() => setIsOpen((open) => !open)}
    >
      {isOpen ? "–" : "+"}
    </button>
  )
}

const WatchedSummary = ({watched}) => {
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

const WatchedMovie = ({movie, onDelete}) => {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`}/>
      <h3>{movie.title}</h3>
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
        <button className="btn-delete" onClick={() => onDelete(movie.imdbID)}>X</button>
      </div>
    </li>
  )
}

const WatchedMoviesList = ({watched, onDelete}) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} onDelete={onDelete}/>
      ))}
    </ul>
  )
}

const Movie = ({movie, onSelect}) => {
  return (
    <li onClick={() => onSelect(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`}/>
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

const MovieList = ({movies, onSelect}) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID}
               movie={movie}
               onSelect={onSelect}/>
      ))}
    </ul>
  )
}


const Box = ({children}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <Button isOpen={isOpen} setIsOpen={setIsOpen}/>
      {isOpen && children}
    </div>
  )
}


const Main = ({children}) => {
  return (
    <main className="main">
      {children}
    </main>
  )
}

const Loader = () => {
  return (
    <p className="loader">Loading...</p>
  )
}

const ErrorMessage = ({message}) => {
  return (
    <p className="error">{message}</p>
  )
}

const MovieDetails = ({selectedId, onCloseMovie, onAddWatched, watched}) => {
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating;

  const countRef = useRef(0)

  useEffect(() => {
    if(userRating) countRef.current++;
  }, [userRating])

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre
  } = movie;

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title: title,
      year: year,
      poster: poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      decisionCount: countRef.current
    }

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(() => {
    const getMovieDetails = async () => {

      setIsLoading(true);
      try {
        const res = await
          fetch(`http://www.omdbapi.com/?apikey=${KEY.key}&i=${selectedId}`)
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return function () {
      document.title = 'usePopcorn';
    }
  }, [title]);

  useKey("Escape", onCloseMovie);

  return (
    <div className="details">
      {isLoading ? <Loader/> :
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
            <img src={poster} alt={title}/>
            <div className="details-overview">
              <h2>{title}</h2>
              <p>{released} &bull; {runtime}</p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ?
                <>
                  <StarRating maxRating={10}
                              size={24}
                              onRateChange={setUserRating}/>
                  <button className="btn-add" onClick={handleAdd}>
                    + Add to list +
                  </button>
                </>
                : <p>You rated this movie with {watchedUserRating} ⭐</p>
              }

            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      }
    </div>
  )
}

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorageState([], "watched");
  const {movies, isLoading, error} = useMovies(query);

  const handleSelectMovie = (id) => {
    setSelectedId(selectedId => id === selectedId ? null : id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  const handleAddWatched = (movie) => {
    if (watched.filter(inList => inList.imdbID === movie.imdbID).length) return null;
    setWatched(watched => [...watched, movie]);
  }

  const handleDeleteWatched = id => {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id))
  }

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery}/>
        <NumResults movies={movies}/>
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader/>}
          {!isLoading && !error && <MovieList movies={movies} onSelect={handleSelectMovie}/>}
          {error && <ErrorMessage message={error}/>}
        </Box>
        <Box>
          {selectedId ? <MovieDetails selectedId={selectedId}
                                      watched={watched}
                                      onCloseMovie={handleCloseMovie}
                                      onAddWatched={handleAddWatched}/> :
            <>
              <WatchedSummary watched={watched}/>
              <WatchedMoviesList watched={watched} onDelete={handleDeleteWatched}/>
            </>}
        </Box>
      </Main>
    </>
  );
}
