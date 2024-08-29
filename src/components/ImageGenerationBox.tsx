import React, { useState } from "react";
import { Box, Input, Button, VStack, Image, Text, useColorModeValue } from "@chakra-ui/react";

const ImageGenerationBox: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [history, setHistory] = useState<{ prompt: string; imageUrl: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = () => {
    setIsLoading(true);
    fetch("http://localhost:8080/api/image-generation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    })
      .then((res) => res.json())
      .then((data) => {
        setHistory([{ prompt, imageUrl: data.imageUrl }, ...history]);
        setPrompt("");
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to generate image:", err);
        setIsLoading(false);
      });
  };

  const inputBg = useColorModeValue("white", "gray.700");
  const buttonBg = useColorModeValue("green.500", "green.200");

  return (
    <Box
      p={5}
      maxWidth="600px"
      mx="auto"
      bg={useColorModeValue("gray.50", "gray.800")}
      borderRadius="lg"
      boxShadow="2xl"
      textAlign="center"
    >
      <VStack spacing={4}>
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to generate..."
          size="lg"
          borderRadius="md"
          bg={inputBg}
        />
        <Button
          onClick={handleGenerate}
          colorScheme="green"
          size="lg"
          width="100%"
          bg={buttonBg}
          _hover={{ bg: "green.600" }}
          isLoading={isLoading}
        >
          Generate Image
        </Button>
        <Box mt={4} width="100%">
          {history.map((item, index) => (
            <Box
              key={index}
              bg={useColorModeValue("white", "gray.700")}
              p={4}
              borderRadius="md"
              boxShadow="md"
              mb={4}
              textAlign="left"
            >
              <Text fontWeight="bold">Prompt:</Text>
              <Text mb={3}>{item.prompt}</Text>
              {item.imageUrl && <Image src={item.imageUrl} alt="Generated" borderRadius="md" />}
            </Box>
          ))}
        </Box>
      </VStack>
    </Box>
  );
};

export default ImageGenerationBox;
