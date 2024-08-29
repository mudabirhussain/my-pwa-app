import React, { useState } from "react";
import { Box, Input, Button, VStack, Image, Text, Spinner, HStack, useColorModeValue } from "@chakra-ui/react";

const ImageGenerationBox: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [history, setHistory] = useState<{ prompt: string; imageUrl: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const openAIGenImgUrl = `${import.meta.env.VITE_RELIFE_BACKEND_URL}/ai/image`;

  const handleGenerate = () => {
    setIsLoading(true);
    fetch(openAIGenImgUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    })
      .then((res) => res.json())
      .then((data) => {
        const imageUrl = data.data[0].url; // Assuming the API response is structured as you've shown
        setHistory([{ prompt, imageUrl }, ...history]);
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
        <Box
          w="100%"
          h="300px"
          p={4}
          borderRadius="md"
          boxShadow="md"
          overflowY="auto"
          bg={useColorModeValue("white", "gray.700")}
        >
          {history.length > 0 ? (
            history.map((item, index) => (
              <Box key={index} mb={4}>
                <HStack justify="flex-start">
                  <Box
                    p={3}
                    borderRadius="md"
                    bg={useColorModeValue("blue.50", "blue.900")}
                    color={useColorModeValue("blue.800", "white")}
                    maxWidth="80%"
                    wordBreak="break-word"
                  >
                    <Text fontWeight="bold">Prompt:</Text>
                    <Text mb={3}>{item.prompt}</Text>
                    {isLoading && index === 0 ? (
                      <Spinner size="lg" color="green.500" />
                    ) : (
                      item.imageUrl && (
                        <Image src={item.imageUrl} alt="Generated" borderRadius="md" mt={2} />
                      )
                    )}
                  </Box>
                </HStack>
              </Box>
            ))
          ) : (
            <Text>No images generated yet.</Text>
          )}
        </Box>
        <HStack w="100%">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate..."
            size="lg"
            borderRadius="md"
            bg={inputBg}
            isDisabled={isLoading}
          />
          <Button
            onClick={handleGenerate}
            colorScheme="green"
            size="lg"
            width="100%"
            bg={buttonBg}
            _hover={{ bg: "green.600" }}
            isLoading={isLoading}
            loadingText="Generating Image..."
          >
            Generate
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ImageGenerationBox;
