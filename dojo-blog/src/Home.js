import BlogList from "./BlogList";
import useFetch from './useFetch';

const Home = () => {

  const { data: blogs, isPending, error } = useFetch('http://localhost:8000/blogs');

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
  // }, []);

  return (
    <div className="home">
      { error && <div className="error">{ error }</div> }
      { isPending && <div>loading...</div> }
      { blogs && <BlogList blogs={ blogs }
                           title="All blogs"/> }
    </div>
  );
};

export default Home;
