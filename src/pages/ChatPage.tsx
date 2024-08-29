import React from "react";
import ChatBox from "../components/ChatBox";
import { Box} from "@chakra-ui/react";


const ChatPage: React.FC = () => {
  return (
    <Box p={5}>
      <ChatBox />
    </Box>
  );
};

export default ChatPage;