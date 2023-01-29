import React from 'react'
import { Box, Container, Text, Tabs, Tab, TabList, TabPanels, TabPanel } from '@chakra-ui/react';
import Login from '../components/Login';
import Signup from '../components/Signup';

const Homepage = () => {
  return (
    <Container maxW='xl' centerContent>
      <Box d='flex' justifyContent='center'
        p={3} bg={"white"} w="100%" m="40px 0 15px 0"
        borderRadius={'lg'} borderWidth='1px'
      >
        <Text fontFamily="Work sans" fontSize="4xl" color={'black'}>
          Talk A Bit
        </Text>
      </Box>
      <Box bg={"white"} p={4} color="black" borderRadius={'lg'} borderWidth='1px'>
        <Tabs variant='soft-rounded' >
          <TabList mb="1em">
            <Tab width='50%'>Log in</Tab>
            <Tab width={'50%'}>Sign up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default Homepage