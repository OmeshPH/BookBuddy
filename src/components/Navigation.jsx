import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/account">Account</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;