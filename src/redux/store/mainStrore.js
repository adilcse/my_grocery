import {createStore,applyMiddleware,combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import  thunkMiddleware  from "redux-thunk";
import { addItemsToCart } from '../reducers/CardReducer';
import { searchProduct } from "../reducers/SearchReducer";
import { userLogin } from "../reducers/UserReducer";
import {CheckoutReducer} from '../reducers/CheckoutReducer'
 const Store=()=>{
    const logger= createLogger();
    const reducers=combineReducers({addItemsToCart,searchProduct,userLogin,CheckoutReducer});
    const store = createStore(reducers,applyMiddleware(thunkMiddleware, logger));
    return store;

}
export default Store;