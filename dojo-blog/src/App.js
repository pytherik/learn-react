//info start json-server:
// npx json-server --watch data\db.json --port 8000
import NavBar from "./NavBar";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Create from "./Create";
import BlogDetails from "./BlogDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>
        <div className="content">
          <Routes>
            <Route element={<Home />} exact path="/" />
            <Route element={<Create />} path="/create" />
            <Route element={<BlogDetails />} path="/blogs/:id" />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;