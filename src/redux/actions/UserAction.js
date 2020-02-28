import { 
    LOGIN_USER_PENDING,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGOUT_USER_PENDING,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAILED,
    REGISTER_USER_PENDING,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    EMPTY_CART,
    LOAD_CART
 } from "../../app/ActionConstants";
 import {firebase, db} from '../../firebaseConnect';
export const Login=(email,password)=>dispatch=>{
    console.log("action",email, password);
    dispatch({ type: LOGIN_USER_PENDING});
    //handles user signin
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user=>{
        dispatch({type:LOGIN_USER_SUCCESS,payload:user})
    })
    .catch(function(error) {
        // Handle Errors here.
        dispatch({type:LOGIN_USER_FAILED,error:{error}})
        // ...
      });
};
//user register with firebase auth and add data to firebase database
export const Register =(name,email,password)=>dispatch=>{
dispatch({type:REGISTER_USER_PENDING});
firebase.auth().createUserWithEmailAndPassword(email, password)
.then((data)=>{
  addUserToDb(dispatch,data.user.uid,data.user.email,name);
  
})
.catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(error);
  dispatch({type:REGISTER_USER_FAILED,payload:error});
  // ...
});

}

//check user loggedin Status
export const LoginStatus=()=>dispatch=>{
  dispatch({ type: LOGIN_USER_PENDING});
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      dispatch({type:LOGIN_USER_SUCCESS,payload:user})
      loadCart(dispatch,user.uid);

    } else {
      // No user is signed in.
      dispatch({type:LOGIN_USER_FAILED})

    }
  });
}

export const LoginSuccess=(user)=>({
type:LOGIN_USER_SUCCESS,
payload : user
})

export const Logout=()=>dispatch=>{
    dispatch({type:LOGOUT_USER_PENDING})
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        dispatch({type:LOGOUT_USER_SUCCESS });
      }).catch(function(error) {
        // An error happened.
        dispatch({LOGOUT_USER_FAILED});
      });
}
const loadCart=(dispatch,userId)=>{
  let cart=new Set();
  let item=[];
  console.log('cart loading')
  db.collection("user").doc(userId).collection('cart').get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
      
        cart.add(doc.id);
        item.push(doc.data());
    });
}).then(()=>{
  dispatch({type:LOAD_CART,payload:cart,item:item})
});
}

//add user to database
const addUserToDb=(dispatch,userId,email,name)=>{
  db.collection("user").doc(userId).set({
    email: email,
    name:name
})
.then(function() {
   dispatch({type:REGISTER_USER_SUCCESS,payload:{uid:userId,email:email}})
})
.catch(function(error) {
    console.error("Error writing document: ", error);
    dispatch({type:REGISTER_USER_FAILED,payload:error})
});
}