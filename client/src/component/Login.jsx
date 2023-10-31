import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
const Login = () => {
 const [show,setShow]= useState(false);
 const [email,setEmail]= useState('');
 const [password,setPassword]= useState('');

 const postDetails = (pics) =>{

 }
 const submitHandler =() =>{
  
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
        style={{marginTop:15}}
        onClick={submitHandler}
        >
          Sing in
        </Button>
        <Button
        variant={"solid"}
        colorScheme="red"
        width={"100%"}
        style={{marginTop:15 , fontFamily:"-moz-initial"}}
        onClick={submitHandler}
        >
          EXPLORE THE APP
        </Button>
    </VStack>
  )
}

export default Login
