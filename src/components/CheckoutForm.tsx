'use client';

import { Product } from '@prisma/client';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

const CheckoutForm = ({
  product,
  clientSecret,
}: {
  product: Product;
  clientSecret: string;
}) => {
  return (
    <Elements options={{ clientSecret }} stripe={stripePromise}>
      <Form />
    </Elements>
  );
};

export default CheckoutForm;

function Form() {
  const stripe = useStripe();
  const elements = useElements();
  return <PaymentElement />;
}
