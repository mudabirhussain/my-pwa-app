import React, { useState } from "react";
import { Box, Input, Button, VStack, Text, HStack, useColorModeValue } from "@chakra-ui/react";

const ChatBox: React.FC = () => {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  const handleSend = () => {
    if (input.trim()) {
      fetch("http://localhost:8080/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: input }), // The request body should match your backend's expected format
      })
        .then((res) => res.json())
        .then((data) => {
          const aiResponse = data.choices[0].message.content; // Extract the AI response
          setChatHistory([...chatHistory, `You: ${input}`, `AI: ${aiResponse}`]); // Update chat history
          setInput(""); // Clear the input field
        })
        .catch((err) => console.error("Failed to send message:", err));
    }
  };

  const userBg = useColorModeValue("blue.50", "blue.900");
  const aiBg = useColorModeValue("gray.100", "gray.700");
  const chatBg = useColorModeValue("white", "gray.800");

  return (
    <Box
      p={5}
      maxWidth="600px"
      mx="auto"
      bg={chatBg}
      borderRadius="md"
      boxShadow="lg"
    >
      <VStack spacing={4}>
        <Box
          w="100%"
          h="300px"
          p={4}
          borderRadius="md"
          boxShadow="md"
          overflowY="auto"
          bg={chatBg}
        >
          {chatHistory.map((msg, index) => (
            <HStack key={index} justify={msg.startsWith("You:") ? "flex-end" : "flex-start"} mb={2}>
              <Box
                p={3}
                borderRadius="md"
                bg={msg.startsWith("You:") ? userBg : aiBg}
                color={msg.startsWith("You:") ? "blue.800" : "gray.800"}
                maxWidth="80%"
                wordBreak="break-word"
              >
                <Text>{msg}</Text>
              </Box>
            </HStack>
          ))}
        </Box>
        <HStack w="100%">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            size="lg"
            borderRadius="md"
          />
          <Button onClick={handleSend} colorScheme="blue" size="lg">
            Send
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ChatBox;
