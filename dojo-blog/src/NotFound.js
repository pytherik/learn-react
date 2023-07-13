import {Link} from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>Sorry</h2>
      <p>Hier hast du nichts zu suchen!!</p>
      <Link to="/">Verpiss dich!</Link>
    </div>
  );
};

export default NotFound;
