import React from "react";
import { Box, Heading, Text, Button, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="gray.50"
      textAlign="center"
    >
      <Box mb={8}>
        <Heading as="h1" size="2xl" color="teal.500" mb={4}>
          Welcome to ReLife
        </Heading>
        <Text fontSize="lg" color="gray.600" maxW="600px">
          Through our digital ecosystem, ReLife creates platforms that are
          simplifying the way people and businesses complete day-to-day
          transactions.
        </Text>
      </Box>
      
      <Stack spacing={4} direction={{ base: "column", sm: "row" }}>
        <Button
          as={Link}
          to="/products"
          colorScheme="teal"
          size="lg"
          variant="solid"
          width="200px"
        >
          Buy Products
        </Button>
        <Button
          as={Link}
          to="/chat"
          colorScheme="blue"
          size="lg"
          variant="solid"
          width="200px"
        >
          Chat with AI
        </Button>
        <Button
          as={Link}
          to="/image-generation"
          colorScheme="green"
          size="lg"
          variant="solid"
          width="200px"
        >
          Generate Images
        </Button>
        <Button
          as={Link}
          to="/transcription"
          colorScheme="purple"
          size="lg"
          variant="solid"
          width="200px"
        >
          Transcribe Audio
        </Button>
      </Stack>
      
      <Box mt={10} color="gray.500">
        Stripe & AI Tools Integration Task | Mudabir Hussain - Software Engineer
        </Box>
    </Box>
  );
};

export default HomePage;
