import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Footer: React.FC = () => {
  return (
    <Box as="footer" bg="brand.900" color="white" py={4} textAlign="center">
      <Text>&copy; {new Date().getFullYear()} ReLife. All rights reserved.</Text>
    </Box>
  );
};

export default Footer;
