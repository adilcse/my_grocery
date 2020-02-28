import React from 'react';
import './Signin.css';
import { useDispatch, useSelector} from 'react-redux';
import { Login as LoginAction  } from "../../redux/actions/UserAction";
import Loading from '../Loading';
const Login = (props)=>{
    const dispatch = useDispatch();
    const tryLogin=()=>{
        let email=document.getElementById("email").value;
        let password=document.getElementById("password").value;
       dispatch(LoginAction(email,password));
    }
    const clear = ()=>{
      document.getElementById("email").value='';
      document.getElementById("password").value='';
    }
    const loggingIn=useSelector(state=>state.userLogin.loggingIn) ;
    const Button=()=>{
      if(!loggingIn)
      return( 
         <>
           <div className="row justify-content-center">
              <div className="col-md-5 text-center ">
                 <button className=" btn btn-block mybtn btn-warning tx-tfm" onClick={tryLogin}>Login</button>
              </div>
              <div className="col-md-5 text-center ">
                 <button className=" btn btn-block mybtn btn-warning tx-tfm" onClick={clear}>Clear</button>
              </div>
           </div>
           <div className="col-md-12 ">
              <div className="login-or">
                 <hr className="hr-or"/>
                 <span className="span-or">or</span>
              </div>
           </div>
           <div className="col-md-12 mb-3">
              <p className="text-center">
                 {/* google siggnin here */}
              </p>
           </div>
           <div className="form-group">
              <p className="text-center">Don't have account? <button className="btn bg-warning" onClick={()=>props.change('register')}>Sign up here</button></p>
           </div>
           </>
      );
      else 
      return(
         <Loading size={80}/>
        )
    }
  
    return(
        <div id="first">
				<div className="myform form ">
					 <div className="logo mb-3">
						 <div className="col-md-12 text-center">
							<h1>Login</h1>
						 </div>
					</div>             
               <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input type="email" name="email"  className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
               </div>
               <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Password</label>
                  <input type="password" name="password" id="password"  className="form-control" aria-describedby="emailHelp" placeholder="Enter Password"/>
               </div>
               <Button/>
                          
                      
                 
				</div>
			</div>
    )
}
export default Login;