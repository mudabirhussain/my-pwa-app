import React from "react";
import { Box, Text, Button, VStack, HStack } from "@chakra-ui/react";
import { useCart } from "../context/CartContext";
import { Link as RouterLink } from "react-router-dom";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart, handleHostedCheckout } = useCart();

  const total = cart.reduce((acc, item) => acc + item.productQuantity * item.productPrice, 0);

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
                <Text fontWeight="bold">{product.productId}</Text>
                <Text>Quantity: {product.productQuantity}</Text>
                <Text>Price: ${(product.productQuantity * product.productPrice).toFixed(2)}</Text>
              </Box>
              <Button colorScheme="red" onClick={() => removeFromCart(product.productId)}>
                Remove
              </Button>
            </HStack>
          ))}
          <HStack justify="space-between">
            <Text fontWeight="bold">Total: ${total.toFixed(2)}</Text>
            <Button colorScheme="teal" onClick={clearCart}>Clear Cart</Button>
          </HStack>
          <VStack spacing={4} mt={4}>
            <Button as={RouterLink} to="/checkout" colorScheme="teal">
              Simple Checkout
            </Button>
            <Button colorScheme="blue" onClick={handleHostedCheckout}>
              Hosted Checkout
            </Button>
          </VStack>
        </VStack>
      )}
    </Box>
  );
};

export default CartPage;
