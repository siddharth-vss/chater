import React, {  useState } from 'react'
import  { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'

// import { useGoogleLogin } from '@react-oauth/google';
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import { useAppContext } from '../../context/appContext';



const Register = () => {

  const { registerUser  } = useAppContext();
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [pic, setPic] = useState();
 const navigate = useNavigate();
  // const [user, setUser] = useState([]);
  // const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast()
  // const status = ['success', 'error', 'warning', 'info']
  // const login = useGoogleLogin({
  //   onSuccess: (codeResponse) => setUser(codeResponse),
  //   onError: (error) => console.log('Login Failed:', error)
  // });

  

  // useEffect(() => { 
  //   if (user) {
  //   axios
  //     .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
  //       headers: {
  //         Authorization: `Bearer ${user.access_token}`,
  //         Accept: 'application/json'
  //       }

  //     })
  //     .then((res) => {
  //        setProfile(res.data);        
  //     })
  //     .catch( (err) => err);
  // } } ,
  //   [user]
  // );

  //   const logOut = () => {
  //     googleLogout();
  //     setProfile(null);
  // };

  const postDetails = (pics) => {
   setLoading(true);
   if(pics === undefined){
     toast({
      title: `Please select Image`,
      status: "warning",
      position: 'top',
      duration:5000,
      isClosable: true,
    })
    return;
   }

  if(pics.type === "image/jpg" ||pics.type === "image/jpeg" ||pics.type === "image/png"  ){
    let Data= new FormData();
    Data.append("file", pics);
    Data.append("upload_preset","chat-app");
    Data.append("cloud_name","dabh5hsuk");
    fetch("https://api.cloudinary.com/v1_1/dabh5hsuk/image/upload",{
      method:"POST",
      body:Data
    }).then((res)=> res.json())
    .then( Data =>{ 
      setPic(Data.url.toString());
     
      setLoading(false);
    })
    .catch((err) =>{
      setLoading(false);
      
    })

  }else{
    toast({
      title: `Please select Image`,
      status: "warning",
      position: 'top',
      duration:5000,
      isClosable: true,
    })
    setLoading(false);
    return;
  }

  }
  const submitHandler = async() => {
   if(!name || !email || !password || !confirmpassword ||!mobile){
    toast({
      title: `Please Fill All The Fields`,
      status: "warning",
      position: 'top',
      duration:5000,
      variant:"left-accent",
      isClosable: true,
    })
   }
   if(password !== confirmpassword){
    toast({
      title: `Password doesn't Match`,
      status: "error",
      position: 'top',
      duration:5000,
      
      isClosable: true,
    })
    return;
   }

   try{
     registerUser( {name, email, password, pic ,mobile});

    toast({
      title: `Account created.`,
      status: "success",
      position: 'top',
      duration:5000,
      isClosable: true,
    })
    
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
        <FormLabel>Name</FormLabel>
        <Input
          placeContent={"Enter Your Name"}
          onChange={(e) => { setName(e.target.value) }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Mobile</FormLabel>
        <Input
          type="number"
          placeContent={"Enter Your Number"}
          onChange={(e) => { setMobile(e.target.value) }}
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
            onChange={(e) => { setConfirmpassword(e.target.value) }}
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
        isLoading={loading}
      >
        Sing UP
      </Button>
      {/* <Button
        colorScheme="blackAlpha"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={login}
      >
        SING UP WITH GOOGLE
      </Button> */}
      {/* <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {profile ? (
                <div>
                    
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
