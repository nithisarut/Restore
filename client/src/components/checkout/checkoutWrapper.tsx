import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { setBasket } from '../../app/store/basket.slice';
import { useAppDispatch } from '../../app/store/store.config';
import CheckoutPage from './checkoutPage';

 
//public key from stripe
const stripePromise = loadStripe('pk_test_51Lq9uGBLo6KpcegUkZDbU29dxVVrXK9PWUJzuNx5oCQUZf8Pw6FFyFej7Ikveciwt8VcWlRdgP4u0QXXIRz1BzN000OIVb6y85')
 
export default function CheckoutWrapper() {

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Payments.createPaymentIntent()
        .then(basket => dispatch(setBasket(basket)))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
}, [dispatch]);

if (loading) return <LoadingComponent message='Loading checkout...' />


  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  )
}
