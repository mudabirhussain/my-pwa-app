import React from "react";
import { Box, Text, Button, VStack, HStack } from "@chakra-ui/react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart, handleHostedCheckout } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((acc, product) => acc + product.productQuantity * product.productPrice, 0);

  const handleSimpleCheckout = () => {
    navigate("/checkout", { state: { cart } });
  };

  return (
    <Box p={5}>
      <Text fontSize="2xl" mb={5}>Your Cart</Text>
      {cart.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <VStack spacing={4} align="stretch">
          {cart.map((product) => (
            <HStack key={product.productId} justify="space-between">
              <Box>
                <Text fontWeight="bold">{product.productName}</Text>
                <Text>Quantity: {product.productQuantity}</Text>
                <Text>Price: ${(product.productPrice / 100).toFixed(2)}</Text>
              </Box>
              <Button colorScheme="red" onClick={() => removeFromCart(product.productId)}>
                Remove
              </Button>
            </HStack>
          ))}
          <HStack justify="space-between">
            <Text fontWeight="bold">Total: ${(total / 100).toFixed(2)}</Text>
            <Button colorScheme="teal" onClick={clearCart}>Clear Cart</Button>
          </HStack>
          <HStack spacing={4} mt={4}>
            <Button colorScheme="teal" onClick={handleSimpleCheckout}>
              Simple Checkout
            </Button>
            <Button colorScheme="blue" onClick={handleHostedCheckout}>
              Hosted Checkout
            </Button>
          </HStack>
        </VStack>
      )}
    </Box>
  );
};

export default Cart;
