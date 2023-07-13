import {useEffect, useState} from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
        .then(res => {
          if (!res.ok) {
            throw Error('Sorry, konnte keine Daten fetschen.')
          }
          return res.json();
        }).then(data => {
        setData(data);
        setIsPending(false);
        setError(null);
      }).catch(err => {
        if (err.name === 'AbortError') {
          console.log('Fetschen abgebrochen!')
        } else {
          setIsPending(false);
          setError(err.message);
        }
      })
    }, 100);
    return () => abortCont.abort();
  }, [url])
  return {data, isPending, error};
}

export default useFetch;