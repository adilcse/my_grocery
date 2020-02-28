import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import CartTotal from '../components/cart/CartTotal';
import EnterAddress from '../components/checkout/EnterAddress';
import LoginRegister from '../components/signin/LoginRegister';
import {LOGIN, ADDRESS, PAYMENT} from '../app/constants';
import PaymentPage from '../components/checkout/Payment'
let fullAddress='';
const Checkout=()=>{
const [currentTab,setCurrentTab]=useState(LOGIN);
let {from}=useParams('from');
const userName=useSelector(state=>state.userLogin.userName);
const details=useSelector(state=>state.CheckoutReducer.total);
const ErrorMessage=()=>{

}
if(!userName &&currentTab!=LOGIN){
    setCurrentTab(LOGIN)
}else if(userName && currentTab===LOGIN){
    setCurrentTab(ADDRESS);
}
const CheckoutCard=(props)=>{
    return(
        <div className='card'>
        <div className='text-left'>
            <h3>LogedIn as : {userName}</h3>      
        </div>
     {props.children}
    </div> 
    )
}
const validateAddress=(tab,address)=>{
    if(tab){
        fullAddress=address;
     setCurrentTab(PAYMENT);
    }
}
const LoginCard=()=>{
    switch(currentTab){
        case LOGIN: 
        return (  
            <>
            <Alert variant='danger' >
                <Alert.Heading>Please Login First</Alert.Heading>
               
            </Alert>
            <LoginRegister/>
            </>
        );
        case ADDRESS:
            return(
                <CheckoutCard>
                      <EnterAddress setValidAddress={validateAddress}/>
                </CheckoutCard>
             );
        case PAYMENT:
            return(
                <CheckoutCard>
                    <PaymentPage/>
                </CheckoutCard>
            )
    }
  
}

return(
    <div className="container">
    <div className='row'>
        <div className='col-md-8'>
       <LoginCard from={'checkout'}/>
        </div>
        <div className='col-md-4'>
        {details.countItems>=1?
        <div className='row'>
            <CartTotal item={details}/>      
        </div>:<div>No Items</div>
    }
        </div>

    </div>

</div>
)
}
export default Checkout;