import React, { useState } from 'react';
import { useParams } from 'react-router';
import Loading from '../components/Loading';
import { db } from '../firebaseConnect';
import Item from '../components/item/Item';
 const Product=()=>{
   const {id}=useParams();
   const [loaded,setLoaded]=useState(false);
   const [item,setItem]=useState({})
   const getProduct=(itemId)=>{
    var docRef = db.collection("products").doc(itemId);
    docRef.get().then(function(doc) {
        setLoaded(true);
        if (doc.exists) {
            setItem(doc.data());
            console.log("Document data:", doc.data());
            
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            setItem(false);

        }
       
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
   }
   if(!loaded) {  
      getProduct(id);
      return(
          <Loading size={120}/>
      )
    }
   else{
       if(item)
   return(
      <Item item={item} id={id}/>
   )
else
    return(
        <h2>
            Sorry !! Item Not Found!!!
        </h2>
    )
}
}
export default Product;