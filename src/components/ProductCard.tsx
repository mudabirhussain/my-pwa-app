import React from "react";
import { Box, Image, Text, Button, useToast } from "@chakra-ui/react";
import { Product } from "../types/type";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const toast = useToast();

  const handleAddToCart = () => {
    addToCart({
      productId: product.productId,
      productQuantity: 1,
      productPrice: product.productPrice,
      productName: product.productName,
    });

    toast({
      title: "Product added to cart.",
      description: `${product.productName} has been added to your cart.`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
      <Image src={product.productImageUrl} alt={product.productName} />
      <Text fontWeight="bold" mt={2}>{product.productName}</Text>
      <Text>{product.productDescription}</Text>
      <Text fontWeight="bold">${product.productPrice.toFixed(2)}</Text>
      <Button mt={3} colorScheme="teal" onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </Box>
  );
};

export default ProductCard;
