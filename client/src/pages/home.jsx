import React from 'react'
import '../index.css'
import Login from '../component/Login'
import Register from '../component/Register'
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
// import { useNavigate } from 'react-router-dom'
// import {useAppContext} from '../context/appContext'
const Home = () => {
  // const navigate = useNavigate();
 
  //   useEffect(() => {
  //       let user = localStorage.getItem("userInfo");
  //         console.log(user)
  //         if(user){
  //           navigate('/chats');
  //       }
  //   }, [ navigate ])
  return (
    <Container  maxW='xl' centerContent >
     <Box 
      d="flex"
      justifyContent="center"
      p={3}
      bg={"white"}
      w="100%"
      m="40px 0 15px 0 "
      borderRadius="lg"
      borderWidth="1px"
     >
       <Text align={"center"} fontSize={'4xl'} color={"#00B7FF"}>
        {/*TEXT-DECREPTO-ALISH*/}TALK-A-LIVE
       </Text>
     </Box>
     <Box bg={"white"} w={"100%"} p={4} borderRadius={"lg"} borderWidth={"1px"} >
     <Tabs variant='soft-rounded' colorScheme='green'>
  <TabList>
    <Tab width={"50%"}>Login</Tab>
    <Tab width={"50%"}>Register</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Login/>
    </TabPanel>
    <TabPanel>
      <Register/>
    </TabPanel>
  </TabPanels>
</Tabs>
     </Box>
    </Container>
  )
}

export default Home
