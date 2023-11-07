import { Box } from "@chakra-ui/layout";
import "./styles.css";
import SingleChat from "./SingleChat";
import { useAppContext } from "../context/appContext";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat ,windowSize } = useAppContext();
  const width = windowSize.width;
  return (
    <Box
    style={{
      display:`${((width < 768 )&& (!selectedChat)) ? "none" : "flex"}`
    }}
    id="chatbox"
      
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      h="91vh"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
     {/* {selectedChat.users} */}
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;