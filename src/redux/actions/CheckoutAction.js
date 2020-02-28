import {  CHECKOUT } from "../../app/ActionConstants";

export const CheckoutCart=(cart,total)=>({
type:CHECKOUT,
payload:cart,
total:total
})
