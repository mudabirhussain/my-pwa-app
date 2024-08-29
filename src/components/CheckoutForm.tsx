import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button, Box, Alert } from "@chakra-ui/react";
import { CheckoutFormProps } from "../types/type";  // Adjust path as necessary

const CheckoutForm: React.FC<CheckoutFormProps> = ({ cartRequest, onPaymentSuccess, onPaymentError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create PaymentIntent by calling your backend
      const response = await fetch("/api/payment/stripe/intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartRequest),
      });

      if (!response.ok) {
        throw new Error("Failed to create PaymentIntent");
      }

      const { clientSecret } = await response.json();

      // Confirm the payment on the client
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (result.error) {
        setError(result.error.message || "Payment failed. Please try again.");
        onPaymentError(result.error.message || "Payment failed. Please try again.");
      } else if (result.paymentIntent?.status === "succeeded") {
        onPaymentSuccess();
      }
    } catch (error: any) {
      setError(error.message || "Payment failed. Please try again.");
      onPaymentError(error.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {error && <Alert status="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <CardElement />
        <Button type="submit" disabled={!stripe || loading} mt={4} colorScheme="teal">
          {loading ? "Processing..." : "Pay"}
        </Button>
      </form>
    </Box>
  );
};

export default CheckoutForm;