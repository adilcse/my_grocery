import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import { Logout as LogoutAction } from '../../redux/actions/UserAction';
const Signout = ()=>{
  const dispatch=useDispatch();
  const logout=()=>{
    dispatch(LogoutAction());
  }

    return(
        <li className="nav-item">
        <NavLink className="nav-link" to="/Logout" onClick={logout}>Logout </NavLink>
      </li>
    )
}
export default Signout;