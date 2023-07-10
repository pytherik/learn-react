import { useState } from "react";
import BlogList from "./BlogList";

const Home = () => {
  const [blogs, setBlogs] = useState ([
    {title: 'Meine neue Website', body: 'lorem ipsulm...', author: 'erik', id: 1},
    {title: 'Welcome to the party!', body: 'lorem ipsulm...', author: 'rolf', id: 2},
    {title: 'Web Dev Top Tips', body: 'lorem ipsulm...', author: 'hansi', id: 3}
  ]);

  const [greeting, changeGreeting] = useState('Hello');
  const handleDelete = (id) => {
    const newBlogs = blogs.filter(blog => blog.id !== id);
    setBlogs(newBlogs);
  }

  const handleGreeting = (g) => changeGreeting(g);

  return (
    <div className="home">
      <BlogList blogs={blogs} title="All blogs" handleDelete={handleDelete}/>
      <p>{greeting}</p>
      <button onClick={() => handleGreeting('Ciao!')}>greet me</button>
    </div>

  );
};

export default Home;
