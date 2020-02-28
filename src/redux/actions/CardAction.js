import {
    ADD_TO_CART_FAILED,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_PENDING,
    REMOVE_FROM_CART_PENDING,
    REMOVE_FROM_CART_SUCCESS,
    REMOVE_FROM_CART_FAILED,
    ADD_TO_GUEST_CART,
    REMOVE_FROM_GUEST_CART
    } from '../../app/ActionConstants';
import { db } from '../../firebaseConnect';

export const addToCart = (itemId,item,userId,quantity=1)=>dispatch=>{
    dispatch({ type: ADD_TO_CART_PENDING});
    if(userId){
    db.collection("user").doc(userId).collection('cart').doc(itemId).set({
        id:itemId,
        item:item,
        quantity:quantity
    })
    .then(function() {
        dispatch({ type: ADD_TO_CART_SUCCESS,payload:itemId,quantity:quantity});
        console.log("Document written");
    })
    .catch(function(error) {
        dispatch({ type: ADD_TO_CART_FAILED});
        console.error("Error adding document: ", error);
    });
}
    
}
export const removeFromCart=(userId,itemId, dispatch)=>{
    dispatch({type: REMOVE_FROM_CART_PENDING});
    db.collection("user").doc(userId).collection('cart').doc(itemId).delete().then(function() {
        console.log("Document successfully deleted!");
        dispatch({type: REMOVE_FROM_CART_SUCCESS,payload:itemId});
    }).catch(function(error) {
        console.error("Error removing document: ", error);
        dispatch({type: REMOVE_FROM_CART_FAILED});
    });
    
}
//guest cart
export const addToGuestCart=(itemId,item,quantity=1)=>dispatch=>{
    dispatch({type:ADD_TO_GUEST_CART,payload:{itemId:itemId,item:{item,quantity:quantity,id:itemId}}})
}
//remove from guest cart
export const removeFromGuestCart=(itemId)=>({
    type:REMOVE_FROM_GUEST_CART,
    payload:itemId
})