import React, { useState } from 'react'
import CartCard from '../components/cart/CartCard';
import CartTotal from '../components/cart/CartTotal';
import { Button, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import CartList from '../components/cart/CartList';
import { db } from '../firebaseConnect';
import Loading from '../components/Loading';
import { removeFromCart, removeFromGuestCart } from '../redux/actions/CardAction';
import { CheckoutCart } from '../redux/actions/CheckoutAction';
import { Link } from 'react-router-dom';
let cart=[];
const Cart =()=>{
    const userId=useSelector(state=>state.userLogin.userId);

    const dispatch=useDispatch();
    let buttonStyle={
        padding : '10px 50px',
        fontSize:'1.5rem',
        color:'white',
    }
    let loading=false;
    const [loaded,setLoaded]=useState(false);
    const [cartUpdated,setCartUpdated]=useState(false);
    let guestCart=useSelector(state=>state.addItemsToCart.item);  
    if(guestCart)
        cart=guestCart;
    const loadCart=()=>{
        cart=[];
        if(!loading){
            loading=true;
            if(userId){
            db.collection("user").doc(userId).collection('cart').get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    cart.push(doc.data());
                });
            }).then(()=>{
                setLoaded(true);
                loading=false;
                
                });
            }
        }
    }
    //place order
    const placeOrder=()=>{
        const countItems=cart.length;
        let total=0;
        let deleveryCharges=0;
        cart.forEach(element => {
            total+=(element.item.price*element.quantity);
        });
        total+=deleveryCharges;
        let obj={
            countItems:countItems,
            total:total,
            deleveryCharges:deleveryCharges
        }
        dispatch(CheckoutCart(cart,obj));
    }

    //total price of all items in cart
   const cardTotal=()=>{
    const countItems=cart.length;
    let total=0;
    let deleveryCharges=0;
    cart.forEach(element => {
        total+=(element.item.price*element.quantity);
    });
    total+=deleveryCharges;
    let obj={
        countItems:countItems,
        total:total,
        deleveryCharges:deleveryCharges
    }
    return obj
   }
//remove item from cart
const removeItem=(id,index)=>{
    cart.splice(index,1);
    setCartUpdated(!cartUpdated);
    if(userId)
        dispatch(removeFromCart(userId,id));
    else
        dispatch(removeFromGuestCart(id))
}
//update quantity of an item
const updateQuantity=(id,quantity)=>{
    console.log(id,quantity,cart);
    cart[id].quantity=quantity;
    setCartUpdated(!cartUpdated);
}

if(!loaded){
    if(userId)
        loadCart();
    else{
        cart=guestCart;
        setLoaded(true);
        setCartUpdated(!cartUpdated);
    
}
return <Loading size={120}/>
}else{
if(cart.length===0){
    return(
        <Alert variant='info'>
            <Alert.Heading>No Item In Cart</Alert.Heading> 
        </Alert>
    )
}
else
    return(
        <div className="container">
            <div className='row'>
                <div className='col-md-8'>
                <CartList item={cart} 
                user={userId} 
                removeItem={removeItem}
                updateQuantity={updateQuantity}
                />
                </div>
                <div className='col-md-4'>
                <div className='row'>
                    <CartTotal item={cardTotal()}/>       
                </div>
                <div className='row mt-5 mx-auto'>
                    <Link to='/checkout/cart'>
                    <button className="btn btn-primary " style={buttonStyle} onClick={placeOrder}>
                        <span>Place Order</span>
                    </button>   
                </Link>
                </div>
                </div>
                
            
            </div>
        
        </div>

    ) 
}

}
export default Cart;