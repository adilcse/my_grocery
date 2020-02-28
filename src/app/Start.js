import React from 'react';
import { useDispatch} from 'react-redux';
import { LoginStatus } from '../redux/actions/UserAction';
//checks the user is loggedin or not
const Start=(props)=>{
    console.log("start");
    let dispatch = useDispatch();
    dispatch(LoginStatus());
    return(
        <>
        {props.children}
        </>
    )
}
export default Start;