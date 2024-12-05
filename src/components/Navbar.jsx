import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>Three.js Examples</h1>
      <ul className="nav-links">
        <li>
          <Link to="/">Basic Example</Link>
        </li>
        <li>
          <Link to="/alternative-example">Alternative Example</Link>
        </li>
        <li>
          <Link to="/upload-modal">Upload Modal</Link>
        </li>
      </ul>
    </nav>
  );
}
