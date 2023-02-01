import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { VStack } from '@chakra-ui/layout'
import React, { useState } from 'react'
import { Button } from '@chakra-ui/button'
import { useToast } from "@chakra-ui/toast";

const Signup = () => {
  const [show, setShow] = useState(false);
  // used to show password
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const toast = useToast();
  function handleClick() {
    setShow(!show);
  }
  async function submitHandler() {
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  }
  return (
    <VStack spacing='5px'>
      <FormControl id='first-name' isRequired>
        <FormLabel>Name</FormLabel>
        <Input placeholder='Enter your name'
          onChange={(e) => setName(e.target.value)} />
      </FormControl>
      <FormControl id='email' isRequired>
        <FormLabel>Email address</FormLabel>
        <Input placeholder='Enter your email' type='email'
          onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id='password' isRequired>
        <FormLabel>Confirm password</FormLabel>
        <Input placeholder='Enter your name'
          onChange={(e) => setConfirmPassword(e.target.value)} />
      </FormControl>
      <Button
        colorScheme="blue" width='100%' style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Sign up
      </Button>
    </VStack>
  )
}

export default Signup