import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import {SignOutLink} from '../SignOut';



const Navigation = ({ authUser }) =>
  <div>
    { authUser ? <NavigationAuth /> : <NavigationNonAuth /> }
  </div>

const NavigationAuth = () =>
  <ul className="navbar-nav">
    <li className="nav-item">
      <NavLink to={"/home"} className="nav-link" href="#">Home</NavLink>
    </li>
    <li className="nav-item">
      <NavLink to={"/events"} className="nav-link" href="#">Events</NavLink>
    </li>
    <li className="nav-item">
      <NavLink to={"/create"} className="nav-link" href="#">Create Event</NavLink>
    </li>
    <li><SignOutLink /></li>
  </ul>

const NavigationNonAuth = () =>
  <ul className="navbar-nav">
    <li className="nav-item">
      <NavLink to={"/home"} className="nav-link" href="#">Home</NavLink>
    </li>
    <li className="nav-item">
      <NavLink to={"/events"} className="nav-link" href="#">Events</NavLink>
    </li>
    <li className="nav-item">
      <NavLink to={"/create"} className="nav-link" href="#">Create Event</NavLink>
    </li>
    <li className="nav-item">
      <NavLink to={"/signup"} className="nav-link" href="#">Sign Up</NavLink>
    </li>
    <li className="nav-item">
      <NavLink to={"/login"} className="nav-link" href="#">Login</NavLink>
    </li>
  </ul>


class Navbar extends Component {
  render() {
    return(
      <div className="container">
        <nav className="navbar navbar-expand navbar-light bg-light">
          <Navigation authUser={this.props.authUser} />
        </nav>
      </div>
    );
  }
}

export default Navbar;
