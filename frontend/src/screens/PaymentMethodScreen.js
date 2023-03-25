import React, { useContext, useEffect, useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps.js";
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { Store } from "./Store.js";


function PaymentMethodScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;
  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "Paypal"
  );
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();

    //dispatch action to submit payment information     
    ctxDispatch({type:'SAVE_PAYMENT_METHOD',payload:paymentMethodName});// pass payload paymentmethodName 
    localStorage.setItem('paymentMethod', paymentMethodName);  //save to local storage
    navigate('/placeorder');
    };

  return( <div>
      <CheckoutSteps step1 step2 step3/>
      <div className="container small-container">
      <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="my-3">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            {" "}
            <Form.Check
              type="radio"
              id="Paypal"
              label="Paypal"
              value="Paypal"
              checked={paymentMethodName === "Paypal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
          />
         
          </div>

          <div className="mb-3">
          
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
         />
          </div>
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
        
    </div>
  )

  }
export default PaymentMethodScreen;
