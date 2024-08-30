import React, { useState, useEffect } from "react";
import { Box, Button, Text, VStack, HStack, Spinner, useColorModeValue } from "@chakra-ui/react";

const TranscriptionBox: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [transcriptionHistory, setTranscriptionHistory] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (mediaRecorder && audioChunks.length > 0) {
      processTranscription();
    }
  }, [audioChunks, mediaRecorder]);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      recorder.start();

      recorder.ondataavailable = (event) => {
        setAudioChunks((prevChunks) => [...prevChunks, event.data]);
      };

      recorder.onstop = () => {
        setIsRecording(false);
      };

      setIsRecording(true);
    });
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  const processTranscription = () => {
    if (audioChunks.length > 0) {
      setIsProcessing(true);
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      const formData = new FormData();
      formData.append("file", audioBlob, "audio.wav");

      const openAITransUrl = `${import.meta.env.VITE_RELIFE_BACKEND_URL}/ai/transcription`;

      fetch(openAITransUrl, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setTranscriptionHistory((prevHistory) => [
            ...prevHistory,
            data.text,
          ]);
          setAudioChunks([]);
          setIsProcessing(false);
        })
        .catch((err) => {
          console.error("Failed to transcribe audio:", err);
          setIsProcessing(false);
        });
    }
  };

  const recordingBg = useColorModeValue("red.100", "red.900");
  const chatBg = useColorModeValue("white", "gray.800");

  return (
    <Box
      p={5}
      maxWidth="600px"
      mx="auto"
      bg={chatBg}
      borderRadius="md"
      boxShadow="lg"
      textAlign="center"
    >
      <VStack spacing={4} align="stretch">
        <Box
          w="100%"
          h="300px"
          p={4}
          borderRadius="md"
          boxShadow="md"
          overflowY="auto"
          bg={chatBg}
        >
          {transcriptionHistory.map((msg, index) => (
            <HStack key={index} justify="flex-start" mb={2}>
              <Box
                p={3}
                borderRadius="md"
                bg={useColorModeValue("gray.100", "gray.700")}
                color="gray.800"
                maxWidth="80%"
                wordBreak="break-word"
              >
                <Text>{msg}</Text>
              </Box>
            </HStack>
          ))}
          {isProcessing && (
            <Spinner size="sm" color="blue.500" />
          )}
        </Box>
        <Button
          onClick={isRecording ? stopRecording : startRecording}
          colorScheme={isRecording ? "red" : "teal"}
          size="lg"
          width="100%"
          bg={isRecording ? recordingBg : undefined}
          _hover={{ bg: isRecording ? "red.600" : "teal.600" }}
          isLoading={isProcessing}
          loadingText="Processing..."
        >
          {isRecording ? (
            <>
              <Spinner size="sm" mr={2} /> Stop Recording
            </>
          ) : (
            "Start Recording"
          )}
        </Button>
      </VStack>
    </Box>
  );
};

export default TranscriptionBox;