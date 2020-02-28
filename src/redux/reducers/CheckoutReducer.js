import {CHECKOUT } from "../../app/ActionConstants"

const inititalState={
    items:[],
    total:{}
}
export const CheckoutReducer=(state=inititalState,action={})=>{
    switch (action.type){
        case CHECKOUT:
            return{...state,items:action.payload,total:action.total}
        default:
            return state;
    }
}