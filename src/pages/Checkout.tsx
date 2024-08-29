import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import {
  Box,
  Button,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const Checkout: React.FC = () => {
  const { cart, clearCart } = useCart();
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.productQuantity * item.productPrice,
    0
  );

  const formWidth = useBreakpointValue({ base: "90%", md: "50%" });

  const handleCheckout = async () => {
    if (!stripe || !elements) {
      setError("Stripe.js has not loaded yet.");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError("CardElement is not available.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/payment/stripe/intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productRequest: cart,
          customerDTO: {
            customerId: "1", // You may want to generate or get an actual customer ID here
            customerName,
            customerEmail,
          },
          currencyEnum: "USD",
          total: totalAmount,
          mode: "STRIPE",
        }),
      });

      const data = await response.json();
      const clientSecret = data.clientSecret;

      if (!clientSecret) {
        setError("Client secret is missing from the response.");
        setLoading(false);
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: customerName,
            email: customerEmail,
          },
        },
      });

      if (result.error) {
        setError(result.error.message || "Payment failed");
      } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
        clearCart();
        setPaymentSuccess(true);
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      p={5}
      width={formWidth}
      mx="auto"
      bg="gray.50"
      borderRadius="md"
      boxShadow="lg"
    >
      <Text fontSize="2xl" mb={5} textAlign="center">Checkout</Text>

      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Full Name</FormLabel>
          <Input
            placeholder="John Doe"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            placeholder="john.doe@example.com"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
          />
        </FormControl>

        <Divider />

        <Box width="100%">
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Payment Details
          </Text>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </Box>

        <Text fontSize="lg" fontWeight="bold" mt={4}>
          Total: ${totalAmount.toFixed(2)}
        </Text>

        {error && (
          <Alert status="error" borderRadius="md" mt={4}>
            <AlertIcon />
            <AlertTitle mr={2}>Payment Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button
          colorScheme="teal"
          mt={4}
          onClick={handleCheckout}
          isLoading={loading}
          loadingText="Processing"
          disabled={loading || !customerName || !customerEmail || totalAmount === 0}
          width="100%"
        >
          Pay Now
        </Button>

        {paymentSuccess && (
          <Alert status="success" borderRadius="md" mt={4}>
            <AlertIcon />
            <AlertTitle mr={2}>Payment succeeded!</AlertTitle>
          </Alert>
        )}
      </VStack>
    </Box>
  );
};

export default Checkout;
