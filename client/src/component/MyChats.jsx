import { AddIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { 
  useEffect
  // , useState 
} from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button } from "@chakra-ui/react";
import { useAppContext } from "../context/appContext";

const MyChats = ({ fetchAgain }) => {

  


  const { selectedChat,sp,windowSize,id, setSelectedChat,  chats, setChats } = useAppContext();

  const toast = useToast();
  const width = windowSize.width;
  const fetchChats = async () => {
    
    try {
      

      const { data } = await sp.get("/chats");
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
   
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain,chats]);

  return (
    <Box
   
    style={{
      display:`${(width < 768 &&selectedChat) ? "none" : "flex"}`
    }}
      
      // d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
         <GroupChatModal> 
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
         </GroupChatModal>
      </Box>
      <Box
      id="chats"
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="80vh"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Box style={{paddingTop: "90px"}} >
            {chats.map((chat) => (
              <Box
              
                id="chatbox"
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(id, chat.users)
                    : chat.chatName}
                </Text>
                         {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                                        {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                
                  </Text>
                )}
              </Box>
            ))}
          </Box>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
