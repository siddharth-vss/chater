import React, { useState } from 'react'
import  { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
const Login = () => {
 const [show,setShow]= useState(false);
 const [email,setEmail]= useState('');
 const [password,setPassword]= useState('');
 const [loading, setLoading] = useState(false);
 const navigate = useNavigate();
 const toast = useToast()
 const postDetails = async() =>{
  try {
    const config = {
     headers :{
       'Content-Type':'application/json'
     },
   };
   const {data} = await axios.post("http://localhost:5000/users/login",{
     email:"testuser@test.com", password:"testuser"
   },config);
   toast({
     title: `Singed in Successfully.`,
     status: "success",
     position: 'top',
     duration:5000,
     isClosable: true,
   })
   localStorage.setItem("userInfo",JSON.stringify(data));
   setLoading(false);
   navigate('/chats');
    
 } catch (error) {
   toast({
     title: 'Error Occupied',
     description: error.response.data.message,
     status: "error",
     duration: 3000,
     position:"top",
     isClosable: true,
   })
   setLoading(false);
 }
 }
 const submitHandler = async() =>{
  if(!email || !password ){
    toast({
      title: `Please Fill All The Fields`,
      status: "warning",
      position: 'top',
      duration:5000,
      variant:"left-accent",
      isClosable: true,
    })
   }
   
  try {
     const config = {
      headers :{
        'Content-Type':'application/json'
      },
    };
    const {data} = await axios.post("http://localhost:5000/users/login",{
      email, password
    },config);
    toast({
      title: `Singed in Successfully.`,
      status: "success",
      position: 'top',
      duration:5000,
      isClosable: true,
    })
    localStorage.setItem("userInfo",JSON.stringify(data));
    setLoading(false);
    navigate('/chats');
     
  } catch (error) {
    toast({
      title: 'Error Occupied',
      description: error.response.data.message,
      status: "error",
      position:"top",
      duration: 3000,
      isClosable: true,
    })
    setLoading(false);
  }

 }
  return (
    <VStack spacing={"5px"}>
        
        
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input 
          type={"email"}
          placeContent={"Enter Your Name"}
          onChange={(e)=>{setEmail(e.target.value)}}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <InputGroup>
          <Input 
          type={show? "text" :"password"}
          placeContent={"Enter Your Name"}
          onChange={(e)=>{setPassword(e.target.value)}}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={()=>{setShow(!show)}}>{show? "Hide" : "Show"}</Button>
          </InputRightElement>
          </InputGroup>
        </FormControl>
       
        <Button
        colorScheme="blue"
        width={"100%"}
        isLoading={loading}
        style={{marginTop:15}}
        onClick={submitHandler}
        >
          Sing in
        </Button>
        <Button
        variant={"solid"}
        colorScheme="red"
        width={"100%"}
        isLoading={loading}
        style={{marginTop:15 , fontFamily:"-moz-initial"}}
        onClick={postDetails}
        >
          EXPLORE THE APP
        </Button>
    </VStack>
  )
}

export default Login
