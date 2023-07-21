import {useRef, useEffect} from "react";

const Search = ({ query, setQuery }) => {
  const inputEl = useRef(null);

  useEffect(() => {
    function callback(e) {
      if (document.activeElement === inputEl.current) return;
      if(e.key === "Enter") {
        inputEl.current.focus();
        setQuery("");
      }
    }
    document.addEventListener('keydown', callback);
    return () => document.removeEventListener('keydown', callback);
  }, [setQuery])

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      ref={inputEl}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}

export default Search;