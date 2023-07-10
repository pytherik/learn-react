import { useState } from "react";
import BlogList from "./BlogList";

const Home = () => {
  const [blogs, setBlogs] = useState ([
    {title: 'Meine neue Website', body: 'lorem ipsulm...', author: 'erik', id: 1},
    {title: 'Welcome to the party!', body: 'lorem ipsulm...', author: 'rolf', id: 2},
    {title: 'Web Dev Top Tips', body: 'lorem ipsulm...', author: 'hansi', id: 3}
  ]);

  const handleDelete = (id) => {
    const newBlogs = blogs.filter(blog => blog.id !== id);
    setBlogs(newBlogs);
  }

  return (
    <div className="home">
      <BlogList blogs={blogs} title="Erik's blogs" handleDelete={handleDelete}/>
    </div>
  );
};

export default Home;
