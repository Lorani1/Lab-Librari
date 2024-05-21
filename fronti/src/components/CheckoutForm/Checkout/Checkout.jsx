// import React, { useState, useEffect } from 'react';
// import { CircularProgress, Divider, Button } from '@material-ui/core';
// import { Link, useHistory } from 'react-router-dom';

// //import { commerce } from '../../../../public/lib/commerce';
// import AddressForm from '../AddressForm';
// import PaymentForm from '../PaymentForm';

// const steps = ['Shipping address', 'Payment details'];

// const Checkout = ({ cart, onCaptureCheckout, order, error }) => {
//   const [checkoutToken, setCheckoutToken] = useState(null);
//   const [activeStep, setActiveStep] = useState(0);
//   const [shippingData, setShippingData] = useState({});
//   const history = useHistory();

//   const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

//   useEffect(() => {
//     if (cart.id) {
//       const generateToken = async () => {
//         try {
//           const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
//           setCheckoutToken(token);
//         } catch {
//           if (activeStep !== steps.length) history.push('/');
//         }
//       };

//       generateToken();
//     }
//   }, [cart]);

//   const test = (data) => {
//     setShippingData(data);
//     nextStep();
//   };

//   let Confirmation = () => (order.customer ? (
//     <>
//       <div>
//         <h5>Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</h5>
//         <hr />
//         <p>Order ref: {order.customer_reference}</p>
//       </div>
//       <br />
//       <Button component={Link} variant="outlined" to="/">Back to home</Button>
//     </>
//   ) : (
//     <div className="d-flex justify-content-center align-items-center my-5">
//       <CircularProgress />
//     </div>
//   ));

//   if (error) {
//     Confirmation = () => (
//       <>
//         <h5>Error: {error}</h5>
//         <br />
//         <Button component={Link} variant="outlined" to="/">Back to home</Button>
//       </>
//     );
//   }

//   const Form = () => (activeStep === 0
//     ? <AddressForm checkoutToken={checkoutToken} nextStep={nextStep} setShippingData={setShippingData} test={test} />
//     : <PaymentForm checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} />);

//   return (
//     <>
//       <div className="pt-4" />
//       <main className="container">
//         <div className="p-4">
//           <h2 className="text-center mb-4">Checkout</h2>
//           {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
//         </div>
//       </main>
//     </>
//   );
// };

// export default Checkout;
