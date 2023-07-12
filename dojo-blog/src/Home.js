import { useState, useEffect } from "react";
import BlogList from "./BlogList";

const Home = () => {
  const [blogs, setBlogs] = useState ([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
    fetch('http://localhost:8000/bogs').then(res => {
      if(!res.ok) {
        throw Error('Sorry, konnte keine Daten fetschen.')
      }
      return res.json();
    }).
    then(data => {
      setBlogs(data);
      setIsPending(false);
      setError(null);
    }).catch(err => {
      setIsPending(false);
      setError(err.message);
    })}, 1000)
  }, [])


  return (
    <div className="home">
      { error && <div className="error">{error}</div> }
      { isPending && <div>loading...</div> }
      { blogs && <BlogList blogs={ blogs }
                           title="All blogs"/> }
    </div>
  );
};

export default Home;
