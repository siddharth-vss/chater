import React, { useState, useEffect } from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
const Register = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [pic, setPic] = useState();

  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  

  useEffect(() => { 
    if (user) {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          Accept: 'application/json'
        }

      })
      .then((res) => {
         setProfile(res.data);        
      })
      .catch( (err) => err);
  } } ,
    [user]
  );

  //   const logOut = () => {
  //     googleLogout();
  //     setProfile(null);
  // };

  const postDetails = (pics) => {

  }
  const submitHandler = () => {

  }
  return (
    <VStack spacing={"5px"}>

      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          placeContent={"Enter Your Name"}
          onChange={(e) => { setName(e.target.value) }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          type={"email"}
          placeContent={"Enter Your Name"}
          onChange={(e) => { setEmail(e.target.value) }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeContent={"Enter Your Name"}
            onChange={(e) => { setPassword(e.target.value) }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => { setShow(!show) }}>{show ? "Hide" : "Show"}</Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeContent={"Enter Your Name"}
            onChange={(e) => { setPassword(e.target.value) }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => { setShow(!show) }}>{show ? "Hide" : "Show"}</Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Uplod Profile Picture</FormLabel>
        <Input
          type={"file"}
          p={1.5}
          accept="image/*"
          placeContent={"Enter Your Name"}
          onChange={(e) => { postDetails(e.target.files[0]) }}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Sing UP
      </Button>
      <Button
        colorScheme="blackAlpha"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={login}
      >
        SING UP WITH GOOGLE
      </Button>
      {/* <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {profile ? (
                <div>
                    {console.log(profile)}
                    <img src={profile.picture} alt="userimage" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={() => login()}>Sign in with Google 🚀 </button>
            )}
        </div> */}

    </VStack>
  )
}

export default Register
