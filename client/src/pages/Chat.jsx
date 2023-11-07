import React ,{ useState }from 'react'

import {useAppContext} from '../context/appContext'
import { Box } from '@chakra-ui/react';
import SideDrawer from '../component/miscellaneous/SideDrawer';
import MyChats from '../component/MyChats';
import ChatBox from '../component/ChatBox';


const Chat = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
 const {user } = useAppContext();


  return (
    <div style={{width:"100%" }}>
      {user && <SideDrawer/>}
         <Box 
         style={{
          display:"flex",
          justifyContent:"space-around",
          top:"10px" ,position:"relative"
         }}
         >
     
        {user && <MyChats  fetchAgain={fetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
        {/* {user && "MYChats"} */}
        {/* {user && "ChatBox"} */}
      
      </Box>
    </div>
  )
}

export default Chat
