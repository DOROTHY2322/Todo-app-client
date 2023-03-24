import React from "react";
import { Link } from "react-router-dom";
import "../navbar.css";

function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="nav-brand">
        TODO
      </Link>
      <ul className="nav-links">
        <li className="nav-link">
          <Link to="/todos" className="nav-item">
            Todos
          </Link>
        </li>
        <li className="nav-link">
          <Link to="/new-todo" className="nav-item">
            New Todo
          </Link>
        </li>
        <li className="nav-link">
          <Link to="/login" className="nav-item">
            Login
          </Link>
        </li>
        <li className="nav-link">
          <Link to="/register" className="nav-item">
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
