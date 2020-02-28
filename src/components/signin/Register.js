import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Register as RegisterWithFirebase } from '../../redux/actions/UserAction'
import { Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';
import Loading from '../Loading';
import ErrorMessage from '../../app/helper/ErrorMessage';
const Register = (props)=>{
   const dispatch=useDispatch();
   const user=useSelector(state=>state.userLogin);
   //validate data
      const validateField=(data)=>{
         if(data.value.length<4){
            data.classList.add('is-invalid');
            data.classList.remove('is-valid');
            return false;
         }
         else{
            data.classList.remove('is-invalid');
            data.classList.add('is-valid');
            return true;   
         }
            

   }
   if(user.userId){
      return <Redirect to='/'/>
   }
   const handelSubmit=()=>{
      let name=document.getElementById('firstname');
      let email=document.getElementById('email');
      let password=document.getElementById('password');
      let cpassword=document.getElementById('cpassword');

      if(validateField(name) && validateField(email) && validateField(password)){
         console.log('registering')
         if(password.value===cpassword.value){
            cpassword.classList.remove('is-invalid');
            cpassword.classList.add('is-valid');
            dispatch(RegisterWithFirebase(name.value,email.value,password.value))
         }else{
            cpassword.classList.add('is-invalid');
            cpassword.classList.remove('is-valid');

         }
      }
   }
   const RegisterButton=()=>{
      if(user.loggingIn){
        return <Loading size={120}/>
      }else{
         return(
            <div>
               <div className="col-md-12 text-center mb-3">
                  <button type='button' className=" btn btn-block mybtn btn-primary tx-tfm" onClick={handelSubmit}>Get Started</button>
               </div>
               <div className="col-md-12 ">
                  <div className="form-group">
                     <p className="text-center"><button className="btn bg-warning" onClick={()=>props.change('login')}>Already have an account?</button></p>
                  </div>
               </div>
            </div>
  
         )
      }
   } 
    return(

        <div id="second">
           {
            user.error? <ErrorMessage isError={user.error} message={user.errorType.message}/>:<></>
           }
          
			      <div className="myform form ">
                        <div className="logo mb-3">
                           <div className="col-md-12 text-center">
                              <h1 >Signup</h1>
                           </div>
                        </div>
                        <form action="#" name="registration">
                           <div className="form-group">
                              <label htmlFor="firstname">Name</label>
                              <input type="text"  name="firstname" required className="form-control invlid" id="firstname" aria-describedby="emailHelp" placeholder="Enter Firstname"/>
                              <div class="invalid-feedback">
                                 Please Enter valid name.
                              </div>
                           </div>
                           <div className="form-group">
                              <label htmlFor="email">Email address</label>
                              <input type="email" name="email"  className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
                           </div>
                           <div className="form-group">
                              <label htmlFor="password">Password</label>
                              <input type="password" name="password" id="password"  className="form-control" aria-describedby="emailHelp" placeholder="Enter Password"/>
                           </div>
                           <div className="form-group">
                              <label htmlFor="cpassword">Confirm Password</label>
                              <input type="password" name="cpassword" id="cpassword"  className="form-control" aria-describedby="emailHelp" placeholder="Enter Confirm Password"/>
                              <div class="invalid-feedback">
                                 password and confirm password did not matched.
                              </div>
                           </div>
                          <RegisterButton/>
                     
                        </form>
                    </div>
			</div>
    )
}
export default Register;