import React from 'react';
import './navbar.scss';
import {NavLink} from "react-router-dom";

export const Navbar = () => {
    return (
      <nav>
          <ul>
              <li><NavLink to="/" >Home</NavLink></li>
              <li><NavLink to="/calc">Calc</NavLink></li>
              <li><NavLink to="/sample">Select</NavLink></li>
              <li><NavLink to="/info">Info</NavLink></li>
          </ul>
      </nav>
    );
}