import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";

import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useToast } from "@chakra-ui/toast";
import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import ProfileModal from "./ProfileModal";
// import NotificationBadge from "react-notification-badge";
// import { Effect } from "react-notification-badge";
// import { getSender } from "../../config/ChatLogics";
import UserListItem from "../userAvatar/UserListItem";
import { useAppContext } from "../../context/appContext";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    setSelectedChat,
    // user,
    // id,
    name,
    windowSize,
    pic,
    email,
    
    chats,
    sp,
    setChats,
  } = useAppContext();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const width = windowSize.width;

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      
      const { data } = await sp.get(`/users?search=${search}`);

      setLoading(false);
      setSearchResult(data);
     
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    

    try {
      setLoadingChat(true);
      
      const { data } = await sp.post(`/chats`, { userId });

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        d="flex"
        style={{display:"flex", alignItems:"center",justifyContent:"space-around"}}
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text style={{display: width<445 ? "none":"block"}} d={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        
        <Text fontSize="2xl" fontFamily="Work sans">
          Talk-A-Tive
        </Text>
        
        <Box style={{display:"flex", alignItems:"center"}} >
          {/* <Menu>
            <MenuButton p={1}>

              <NotificationBadge 
                count={notification.length}
                effect={Effect.SCALE}              /> 

               <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
              <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                   {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(id, notif.chat.users)}`}
                </MenuItem>
            ))} 
            </MenuList>
          </Menu> */}
          <Menu>
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={name}
                src={pic}
              />
              </MenuButton>
              <MenuList>
                   <ProfileModal user={{name , pic ,email}}>
                <MenuItem>My Profile</MenuItem> 
              </ProfileModal> 
                  <MenuDivider />
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>

          <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
              <DrawerBody>
                <Box d="flex" pb={2}>
                  <Input
                    placeholder="Search by name or email"
                    mr={2}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button onClick={handleSearch}>Go</Button>
                </Box>
                {loading
                  ? (
                    <ChatLoading />
                  ) : (
                    searchResult?.map((user) => (
                      <UserListItem
                        key={user._id}
                        user={user}
                        handleFunction={() => accessChat(user._id)}
                      />
                    ))
                  )}
                {loadingChat && <Spinner ml="auto" d="flex" />}
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
        );
}

        export default SideDrawer;
