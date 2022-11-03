import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    VStack,
    Text,
    useBreakpointValue,
  } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import {RESET_CODE} from  '../utils/mutations';
// import ResetPassword from './ResetPassword';
import image from '../assets/images/pexels-pixabay-48794.jpg';

  const Forget  = (props) =>{
    const [formState, setFormState] = useState({email: ''});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      document.body.style.overflow = "hidden";
    }, []);

    const [resetPassword, { error }] = useMutation(RESET_CODE);

    const isInvalid = formState.email === '';

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
    console.log(formState.email);
    try {
      await resetPassword({
        variables: { email: formState.email },
      });
      window.location.assign('/resetpassword');
    } catch (e) {
      setIsLoading(false);
      console.log(error);
    }
  };


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
          <Heading color={'white'} lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Forgot your password?
          </Heading>
          <Text
            fontSize={{ base: 'sm', sm: 'md' }}
            color={'gray.400'}>
            You&apos;r password reset link was sent to your Email address
          </Text>
          <FormControl id="email">
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
              Request Reset
            </Button>
          </Stack>
        </Stack>
        </form>
      </VStack>
      </Flex>
    );
  }

  export default Forget;