import React, { useState, useEffect } from "react";
import { Box, Button, Text, VStack, Spinner, useColorModeValue } from "@chakra-ui/react";

const TranscriptionBox: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [transcription, setTranscription] = useState<string | null>(null);

  useEffect(() => {
    if (mediaRecorder && audioChunks.length > 0) {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      const formData = new FormData();
      formData.append("file", audioBlob, "audio.wav");

      fetch("http://localhost:8080/ai/transcribe", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => setTranscription(data.transcription))
        .catch((err) => console.error("Failed to transcribe audio:", err));
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
        console.log("Recording stopped.");
      };

      setIsRecording(true);
    });
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
    setIsRecording(false);
  };

  const recordingBg = useColorModeValue("red.100", "red.900");

  return (
    <Box
      p={5}
      maxWidth="600px"
      mx="auto"
      bg="gray.50"
      borderRadius="md"
      boxShadow="lg"
      textAlign="center"
    >
      <VStack spacing={6}>
        <Button
          onClick={isRecording ? stopRecording : startRecording}
          colorScheme={isRecording ? "red" : "teal"}
          size="lg"
          width="100%"
          bg={isRecording ? recordingBg : undefined}
          _hover={{ bg: isRecording ? "red.600" : "teal.600" }}
        >
          {isRecording ? (
            <>
              <Spinner size="sm" mr={2} /> Stop Recording
            </>
          ) : (
            "Start Recording"
          )}
        </Button>

        {transcription && (
          <Box
            mt={4}
            p={4}
            borderRadius="md"
            bg="gray.100"
            boxShadow="md"
            width="100%"
            textAlign="left"
          >
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Transcription:
            </Text>
            <Text fontSize="md">{transcription}</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default TranscriptionBox;
