import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { setCurrentUser, checkUserSession } from './redux/User/user.actions';
import { useDispatch } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';

//high order component
//WithAuth can restrict access to pages based on being logged in or not
import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';

//layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';
import AdminLayout from './layouts/AdminLayout';


//pages
import './default.scss';
import EditHomepage from './pages/EditHompage'
import AllOrders from './pages/AllOrders'
import Order from './pages/Order'
import Dashboard from './pages/Dashboard'
import Contact from './pages/Contact'
import EditProductPage from './pages/EditProductPage';
import Payment from "./pages/Payment";
import Cart from "./pages/Cart";
import Product from "./pages/Products";
import Homepage from "./pages/Homepage";
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Register from './pages/Register';
import Admin from './pages/Admin';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About'
import Gallery from './pages/Gallery';
// import Products from './pages/Products';

const App = props =>  {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
    
  }, []);

    //sets the currentUser to the user that is logged in

  return (
    <div className="App">
      <Switch>
      <Route exact path="/" render={() => (
          <HomepageLayout>
            <Homepage />
            </HomepageLayout>
        )} />
        <Route path="/gallery"
          render = {() => (
            //withAuth makes it so you get redirected to login if you are not logged in trying to access it
              <MainLayout>
                  <Gallery/>
              </MainLayout>
          )}/>
      <Route path="/productedit/:editType" render={() => (
          <MainLayout>
            <EditProductPage />
          </MainLayout>
        )} />
        
        <Route exact path="/about" render={() => (
          <HomepageLayout>
            <About />
            </HomepageLayout>
        )} />
        <Route path="/admin/:filterType"
          render = {() => (
            //withAuth makes it so you get redirected to login if you are not logged in trying to access it
            <WithAdminAuth>
              <MainLayout>
                  <Admin/>
              </MainLayout>
            </WithAdminAuth>
          )}/>
          <Route path="/edit-homepage"
          render = {() => (
            //withAuth makes it so you get redirected to login if you are not logged in trying to access it
            <WithAdminAuth>
              <MainLayout>
                  <EditHomepage/>
              </MainLayout>
            </WithAdminAuth>
          )}/>
          <Route path="/all-orders"
          render = {() => (
            //withAuth makes it so you get redirected to login if you are not logged in trying to access it
            <WithAdminAuth>
              <MainLayout>
                  <AllOrders/>
              </MainLayout>
            </WithAdminAuth>
          )}/>
          <Route path="/payment" render = {() => (
          <WithAuth>
            <MainLayout>
              <Payment />
          </MainLayout>
          </WithAuth>
        )}/>
                  <Route path="/dashboard" render = {() => (
          <WithAuth>
            <MainLayout>
              <Dashboard />
          </MainLayout>
          </WithAuth>
        )}/>
        <Route path="/admin"
          render = {() => (
            //withAuth makes it so you get redirected to login if you are not logged in trying to access it
            <WithAdminAuth>
              <MainLayout>
                  <Admin/>
              </MainLayout>
            </WithAdminAuth>
          )}/>
          <Route path="/order/:orderID"
          render = {() => (
            //withAuth makes it so you get redirected to login if you are not logged in trying to access it
            <WithAuth>
              <MainLayout>
                  <Order/>
              </MainLayout>
            </WithAuth>
          )}/>
          <Route path="/contact" render={() => (
          <MainLayout>
            <Contact />
          </MainLayout>
        )} />
        
        <Route path="/products/:filterType" render={() => (
          <MainLayout>
            <Product />
          </MainLayout>
        )} />
        <Route exact path="/products" render={() => (
          <MainLayout>
            <Product />
          </MainLayout>
        )} />
        
        <Route path="/product/:productID" render={() => (
          <MainLayout>
            <ProductDetails />
          </MainLayout>
        )} />
        
         <Route path="/cart" render = {() => (
            <MainLayout>
            <Cart />
          </MainLayout>
        )}/>
        
        <Route path="/register" 
          render =  {() => (
              <MainLayout>
              <Register/>
            </MainLayout>
        )}/>
        <Route path="/recovery" 
          render = {() => (
              <MainLayout>
              <Recovery />
            </MainLayout>
        )}/>
        <Route path="/login" 
        //if currentUser exisits, redirect to homepage, i guess ? means exist lol
          render =  {() => (
              <MainLayout>
              <Login/>
            </MainLayout>
        )}/>
        
      </Switch>
    </div>
  );
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
