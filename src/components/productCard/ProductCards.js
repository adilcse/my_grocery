import React,{useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {addToCart, addToGuestCart} from '../../redux/actions/CardAction';
import Card from './Card';
import { db } from '../../firebaseConnect';
import Loading from '../Loading';
import { Alert } from 'react-bootstrap';
let loading=false;
let source=[];
const ProductCards =(props)=>{
    const dispatch = useDispatch();
    const userid=useSelector(state=>state.userLogin.userId)
    const[loaded,setLoaded]=useState(false); 
    const [showMsg,setShowMessage]=useState(false); 
 const onItemAdded = (itemId,item,userId=userid) => {
      if(userId)
        dispatch(addToCart(itemId,item,userId));
    else
    dispatch(addToGuestCart(itemId,item));
       // setShowMessage(true);
  }
    const loadItem=()=>{
        if(!loading){
           loading=true;
        db.collection("products").limit(5).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
               // console.log(doc.id, " => ", doc.data());
               source.push({id:doc.id,data:doc.data()});
               
            });
            setLoaded(true);
           loading=false;
        });}
    }
    const ErrorMessage= ()=>{
        if(showMsg)
            return (  
                <Alert variant='danger' onClose={()=>setShowMessage(false)} dismissible >
                    <Alert.Heading>Please Login First</Alert.Heading>
                </Alert>
            )
        return <> </>;    
    }
   if(!loaded && source.length<1){
    loadItem();
    return(
       <Loading size={120}/>
    )
}

    return (
        <div className="container ">
           <ErrorMessage/>
          
            {/* <ErrorMessage className={showMsg?'visible alert alert-danger':'invisible'} message={'please login first'}/> */}
            <div className="row text-center">
            {
                source.map((item) =>{    
                   
                    return <Card source={item.data} id={item.id} key = {item.id} addItem={onItemAdded} />
                } )
            }
            </div>
        </div>
    )
 }   



export default ProductCards; 