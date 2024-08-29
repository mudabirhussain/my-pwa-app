import React from "react";
import { Box } from "@chakra-ui/react";
import TranscriptionBox from "../components/TranscriptionBox";

const TranscriptionPage: React.FC = () => {
  return (
    <Box p={5}>
      <TranscriptionBox />
    </Box>
  );
};

export default TranscriptionPage;
