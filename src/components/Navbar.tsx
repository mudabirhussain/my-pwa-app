import React from 'react';
import { Box, Flex, Link, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <Box bg="brand.900" p={4} color="white">
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Link as={RouterLink} to="/" fontSize="lg" fontWeight="bold">ReLife</Link>
        </Box>
        <Box>
          <Link as={RouterLink} to="/cart">
            <Button colorScheme="teal" variant="outline">
              Cart
            </Button>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
