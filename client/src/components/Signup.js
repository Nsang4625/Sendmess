import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { VStack } from '@chakra-ui/layout'
import React, { useState } from 'react'
import { Button } from '@chakra-ui/button'

const Signup = () => {
  const [show, setShow] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  function handleClick() {
    setShow(!show);
  }
  function submitHandler() {

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