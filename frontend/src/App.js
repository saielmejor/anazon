import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Badge from "react-bootstrap/esm/Badge";
import Nav from "react-bootstrap/Nav";
import { useContext } from "react";
import { Store } from "./screens/Store";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import NavDropdown from "react-bootstrap/NavDropdown"
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SignupScreen from "./screens/SignupScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";


function App() {
  //use context to pass data form StoreProvider
  const { state ,dispatch:ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler=()=>{ 
    ctxDispatch({type:'USER_SIGNOUT'})
    //remove userInfo from localStorage 
    localStorage.removeItem('userInfo'); 
    localStorage.removeItem('shippingAddress'); 
    localStorage.removeItem('paymentMethod');  
    window.location.href='/signin' // goes back to the sign in  page 

  }
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
      <ToastContainer position="bottom-center" limit={1}></ToastContainer>
        <header>
          <Navbar bg="dark" variant="dark" expand='lg'>
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand> amazona</Navbar.Brand>
              </LinkContainer>
              {/* Navbar toggle collapse for nav bar */} 
              <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle> 
              <Navbar.Collapse id="basic-navbar-nav "> 
              <Nav className="me-auto w-100 justify-content-end">
                <Link to="/cart" className="nav-link">
                  Cart{" "}
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id='basic=nav-dropdown'>
                    <LinkContainer to="/profile">
                      <NavDropdown.Item> User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item> Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item> 
                    <Link className="dropdown-item" to="#asignout"
                    onClick={signoutHandler} > Sign Out</Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign In{" "}
                  </Link>
                )}
              </Nav>
              
              
              </Navbar.Collapse>
              
            </Container>
          </Navbar>
        </header>
        <main>
          {/* define a route for home route */}
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/" element={<HomeScreen />}></Route>{" "}
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen />} /> 
              <Route path="/signup" element={<SignupScreen />} /> 
              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen/>} />
              <Route path="/placeorder" element={<PlaceOrderScreen/>} />
              <Route path="/order/:id" element={<OrderScreen/>} />
              <Route path="/orderhistory" element={<OrderHistoryScreen></OrderHistoryScreen>}></Route>
              <Route path="/profile" element={<ProfileScreen></ProfileScreen>}></Route>
              
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
