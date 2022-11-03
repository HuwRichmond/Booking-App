import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';

import image from '../assets/images/pexels-pixabay-48794.jpg';

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {UPDATE_PASSWORD} from  '../utils/mutations';

const ResetPassword  = (props) =>{
    const [formState, setFormState] = useState({resetcode: '', email: ''});
    const [returnMessage, setReturnMessage] = useState();

    const [isLoading, setIsLoading] = useState(false);

    const isInvalid = formState.resetcode === '' || formState.email ==='';

    const [updatePassword] = useMutation(UPDATE_PASSWORD);
    const { isOpen, onOpen } = useDisclosure()
    let mutationResponse;

    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value,
      });
    };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if(formState.newpassword===formState.confirmpassword)
    {
      console.log("nice")
      mutationResponse = await updatePassword({
        variables: { email: formState.email, 
                  resetCode: formState.resetcode, 
                  password: formState.newpassword },
      });
      console.log("Mutation response" ,mutationResponse.data.updatePassword);
      
      if (!mutationResponse.data.updatePassword)
      {
        setReturnMessage("Invalid Code");
        setIsLoading(false);
        return;
      }
      setReturnMessage("Password changed");
      onOpen();
    }
    else{ 
      setReturnMessage("Password not matching");
      setIsLoading(false);
      return;
    }
    
    try {
      
      
    } catch (e) {
      setIsLoading(false);
      console.log("Error",e);
    }

    
  };

  const handleClose= async (event) =>{
    window.location.replace('/login');
  }

  return (
    <Flex
    w={'full'}
    h={'100vh'}
    backgroundImage={image}
    backgroundSize={'cover'}
    backgroundPosition={'center center'}>
    <VStack
      w={'full'}
      justify={'center'}
      px={useBreakpointValue({ base: 4, md: 8 })}
      bgGradient={'linear(to-r, blackAlpha.800, transparent)'}>
      <form onSubmit={handleFormSubmit}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={'blackAlpha.700'}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>

        <FormLabel color={'gray.400'}>A link was sent to your Email address  </FormLabel>
        <Heading color={'white'} lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Enter new password
        </Heading>
        <FormControl id="email" isRequired>
          <FormLabel color={'white'}>Email address</FormLabel>
          <Input
            border={'none'}
            bg={'whiteAlpha.400'}
            color={'white'}
            name="email"
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            onChange={handleChange}
            type="email"
          />
        </FormControl>
        <FormControl id="newpassword" isRequired>
          <FormLabel color={'white'}>Password</FormLabel>
          <Input
            border={'none'}
            bg={'whiteAlpha.400'}
            color={'white'}
            type="password"
            name="newpassword"
            placeholder="New Password"
            _placeholder={{ color: 'gray.500' }}
            onChange={handleChange}
            />
        </FormControl>
        <FormControl id="confirmpassword" isRequired>
          <FormLabel color={'white'}>Confirm Password</FormLabel>
          <Input
            border={'none'}
            bg={'whiteAlpha.400'}
            color={'white'}
            type="password"
            name="confirmpassword"
            placeholder="Confirm New Password"
            _placeholder={{ color: 'gray.500' }}
            onChange={handleChange}
            />
        </FormControl>
        <FormControl id="resetcode" isRequired>
          <FormLabel color={'white'}>Reset Code</FormLabel>
          <Input
            border={'none'}
            bg={'whiteAlpha.400'}
            color={'white'}
            type="text"
            name="resetcode"
            placeholder="Reset Code"
            _placeholder={{ color: 'gray.500' }}
            onChange={handleChange}
            />
        </FormControl>
        <Stack spacing={6}>
          <Button
            type="submit"
            isLoading={isLoading}
            disabled={isInvalid}
            bg={'#0081a7ff'}
            color={'white'}
            _hover={{
              bg: '#00afb9ff',
          }}>
          Submit
          </Button>
          {/* <DialogModal /> */}
          <FormLabel
          color={'white'}>{returnMessage}</FormLabel>
        </Stack>
      </Stack>
      
      <Modal isOpen={isOpen} onClose={handleClose} props={mutationResponse} >
          <ModalOverlay />
          <ModalContent  >
            <ModalHeader>Password Changed</ModalHeader>
            <ModalCloseButton />
            <ModalBody  >
              Password was successfully changed, you can now login with new password.
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={handleClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </form>
    </VStack>
  </Flex>
  );
}

export default ResetPassword;