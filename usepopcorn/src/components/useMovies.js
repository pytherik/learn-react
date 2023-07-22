import {useEffect, useState} from "react";
import {KEY} from "../config";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const fetchMovies = async () => {
      setIsLoading(true);
      setError("")
      try {
        const res = await
          fetch(`http://www.omdbapi.com/?apikey=${KEY.key}&s=${query}`,
            {signal: controller.signal})

        if (!res.ok)
          throw new Error("Oh ohhhh...");

        const data = await res.json();
        if (data.Response === 'False')
          throw new Error("🤔 Movie not Found")

        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (!query.length) {
      setMovies([]);
      setError('');
      return;
    }

    // handleCloseMovie();
    fetchMovies();
    return function () {
      controller.abort();
    }
  }, [query])
  return {movies, isLoading, error};
}
