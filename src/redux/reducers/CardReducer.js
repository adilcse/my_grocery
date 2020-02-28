import {
    ADD_TO_CART_FAILED,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_PENDING,
    USER_NOT_SIGNED_IN,
    LOGOUT_USER_SUCCESS,
    REMOVE_FROM_CART_SUCCESS,
    LOAD_CART,
    ADD_TO_GUEST_CART,
    REMOVE_FROM_GUEST_CART
    } from '../../app/ActionConstants';


const initialState={
   cart:new Set(),
    item:[]
    
}
export const addItemsToCart = (state=initialState,action={})=>{
    console.log(state.item);
    switch(action.type){
        case  ADD_TO_CART_SUCCESS:
           { 
             let Ncart =new Set([...state.cart]);
             Ncart.add(action.payload);
             return {...state,cart:Ncart} ;
        }
        case REMOVE_FROM_CART_SUCCESS:
           { 
             let Ncart =new Set([...state.cart]);
             Ncart.delete(action.payload);
             return {...state,cart:Ncart} ;
            }
        case LOGOUT_USER_SUCCESS:
            return {...state,cart:initialState.cart,item:[]};
        case ADD_TO_GUEST_CART:
            {
                let Ncart =new Set([...state.cart]);
                Ncart.add(action.payload.itemId);
                let Nitem=[...state.item];
                Nitem.push(action.payload.item);
                return{...state,cart:Ncart,item:Nitem}
            }
        case REMOVE_FROM_GUEST_CART:
            {
                let Ncart =new Set([...state.cart]);
                Ncart.delete(action.payload);
                let Nitem=[...state.item];
                Nitem.forEach((element,index)=>{
                    if(element.id===action.payload){
                        Nitem.splice(index,1)
                    }
                })
                return{...state,cart:Ncart,item:Nitem}
            }    
        case LOAD_CART:
            return {...state,cart:action.payload,item:action.item}  ;  
        default : 
        return state;
    }
}