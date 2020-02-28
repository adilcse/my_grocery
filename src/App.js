import React from 'react';
import './App.css';
import Nav from './sections/header/Nav';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from './containers/Home';
import SearchPage from './containers/SearchPage';
import Signin from './containers/Signin';
import Start from './app/Start';
import Product from './containers/Product';
import Cart from './containers/Cart';
import MyOrder from './containers/MyOrder';
import Checkout from './containers/Checkout';
function App() {
  const Logout=()=>{
    return <Redirect to='/Home'/>
  }
  return (
    <Start>
    <Router>
      <div className="App text-center">
        <Nav/>
          <Switch>
            <Route path='/Home' component={Home} />
            <Route path='/About'>
              <h2>about</h2>
            </Route>
            <Route path='/Search/:id'>
             <SearchPage/>
            </Route>
            <Route path='/signin'>
              <Signin/>
            </Route>
            <Route path='/cart'>
              <Cart/>
            </Route>
            <Route path='/myOrder'>
              <MyOrder/>
            </Route>
            <Route path='/Checkout/:from'>
              <Checkout/>
            </Route>
            <Route path='/Logout'>
              <Logout/>
            </Route>
            <Route path='/Product/:id'>
              <Product/>
            </Route>
            <Route path='/' exact={true}>
                <Home/>
            </Route>
          </Switch>    
      </div>
    </Router>
    </Start>
  );
}

export default App
