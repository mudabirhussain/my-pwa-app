import React, { useEffect, useState } from "react";
import { Box, SimpleGrid, Heading, useColorModeValue, Spinner, Center } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/type";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllProductUrl = `${import.meta.env.VITE_RELIFE_BACKEND_URL}/products/all`;
  
  useEffect(() => {
    // Fetch products from your backend
    fetch(fetchAllProductUrl)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <Box p={8} bg={useColorModeValue("gray.50", "gray.900")} minH="100vh">
      <Heading as="h1" fontSize="3xl" textAlign="center" mb={8} color={useColorModeValue("teal.600", "teal.300")}>
        Explore Our Products
      </Heading>
      {isLoading ? (
        <Center>
          <Spinner size="xl" color={useColorModeValue("teal.600", "teal.300")} />
        </Center>
      ) : (
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={8}>
          {products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default Products;