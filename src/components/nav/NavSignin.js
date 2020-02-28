import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
const NavSignin = ()=>{
    return(
        <li className="nav-item">
        <NavLink className="nav-link" to="/signin">Signin/Register <FaUserAlt/> </NavLink>
      </li>
    )
}
export default NavSignin;