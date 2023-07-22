import {useRef} from "react";
import {useKey} from "./useKey";

const Search = ({ query, setQuery }) => {
  const inputEl = useRef(null);

  useKey("Enter", function() {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  })

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