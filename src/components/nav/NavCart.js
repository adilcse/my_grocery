import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { IoIosCart } from 'react-icons/io';
const NavCart =()=>{
    const cart=useSelector(state=>state.addItemsToCart.cart);
    let countItem=cart.size;
    let style={
        backgroundColor:'#f5c84c',
        borderRadius:'50%',
        fontSize:'110%',
        textAlign:'center',
        color:'black'
    }
return(
    <li className="nav-item">
    <NavLink className="nav-link" to="/cart">Cart <IoIosCart/><sup style={style}> {countItem}</sup> </NavLink>
  </li>
);
}
export default NavCart;