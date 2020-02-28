import { CheckoutCart } from "../../redux/actions/CheckoutAction";

export const AddItemForCheckout=(dispatch,source)=>{
    let cart = {
      id:source.id,
      item:source,
      quantity:1
    };
    let total={
      deleveryCharges:0,
      countItems:1,
    }
    total.total=source.price+total.deleveryCharges;
   dispatch(CheckoutCart([cart],total));
   
  }
  