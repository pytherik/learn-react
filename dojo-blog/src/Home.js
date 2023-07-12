import { useState, useEffect } from "react";
import BlogList from "./BlogList";

const Home = () => {
  const [blogs, setBlogs] = useState ([]);
  const [isPending, setIsPending] = useState(true);

  // const fetchBlogs = async () => {
  //   const response = await fetch('http://localhost:8000/blogs');
  //   return await response.json();
  // }
  //
  // useEffect(() => {
  //
  //   const blogsFetched = async () => {
  //     const blogsFromServer = await fetchBlogs()
  //     setBlogs(blogsFromServer);
  //   };
  //   blogsFetched();
  //   }, []);

  useEffect(() => {
    fetch('http://localhost:8000/blogs').then(res => res.json()).then(data => setBlogs(data))
  }, [])


  return (
    <div className="home">
      { isPending && <div>loading...</div> }
      { blogs && <BlogList blogs={ blogs }
                           title="All blogs"/> }
    </div>
  );
};

export default Home;
