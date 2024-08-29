import React from "react";
import ChatBox from "../components/ImageGenerationBox";
import { Box} from "@chakra-ui/react";


const ImageGenerationPage: React.FC = () => {
  return (
    <Box p={5}>
      <ChatBox />
    </Box>
  );
};

export default ImageGenerationPage;