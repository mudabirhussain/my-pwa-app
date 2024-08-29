import React, { useState } from "react";
import { Box, Input, Button, VStack, Image } from "@chakra-ui/react";

const ImageGenerationPage: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleGenerate = () => {
    // Call your backend API to generate the image
    fetch("http://localhost:8080/api/image-generation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    })
      .then((res) => res.json())
      .then((data) => setImageUrl(data.imageUrl))
      .catch((err) => console.error("Failed to generate image:", err));
  };

  return (
    <Box p={5}>
      <VStack spacing={4}>
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to generate..."
        />
        <Button onClick={handleGenerate} colorScheme="green">
          Generate Image
        </Button>
        {imageUrl && <Image src={imageUrl} alt="Generated" />}
      </VStack>
    </Box>
  );
};

export default ImageGenerationPage;
