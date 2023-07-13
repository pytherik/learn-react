import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
      <nav className="navbar">
        <h1>The Dojo Blog</h1>
        <div className="links">
          <Link to="/">Home</Link>
          <Link className="btn btn-new" to="/create" >New Blog</Link>
        </div>
      </nav>
  );
};

export default NavBar;