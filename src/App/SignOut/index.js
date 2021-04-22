import { NavLink } from 'react-router-dom';
import {doSignOut} from '../Auth';
import React from 'react';
import './style.css'

// const SignOutButton = () =>
//   <button
//     type="button"
//     onClick={doSignOut}
//   >
//     Sign Out
//   </button>

export const SignOutLink = () =>
	<NavLink to={"/home#"} className="nav-link" onClick={doSignOut} href="/home">Sign Out</NavLink>

export default SignOutLink;