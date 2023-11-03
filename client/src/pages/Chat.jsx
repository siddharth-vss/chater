import React from 'react'
// import axios from 'axios'
import {useAppContext} from '../context/appContext'
import { Box } from '@chakra-ui/react';
import SideDrawer from '../component/miscellaneous/SideDrawer';
import MyChats from '../component/miscellaneous/MyChats';
import ChatBox from '../component/miscellaneous/ChatBox';
import { Flex } from '@chakra-ui/react'

const Chat = () => {
  
 const {user } = useAppContext();


  return (
    <div style={{width:"100%" , }}>
      {user && <SideDrawer/>}
         <Box 
         style={{
          display:"flex",
          justifyContent:"space-around",
          top:"10px" ,position:"relative"
         }}
         >
     
        {user && <MyChats/>}
        {user && <ChatBox/>}
        {/* {user && "MYChats"} */}
        {/* {user && "ChatBox"} */}
      
      </Box>
    </div>
  )
}

export default Chat
