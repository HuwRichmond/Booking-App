  import React, { useState, useEffect } from 'react';
  import { useMutation } from '@apollo/client';
import image from '../assets/images/pexels-pixabay-48794.jpg';
// import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Link,
  VStack,
  InputRightElement,
  InputGroup,
  useBreakpointValue,
} from '@chakra-ui/react';

const Login = (props) => {

  const [formState, setFormState] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [login, { error }] = useMutation(LOGIN);

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const isInvalid = formState.password === '' || formState.email ==='';

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      console.log(mutationResponse);
      const token = mutationResponse.data.login.token;
      Auth.login(token);
      Auth.setUserType(mutationResponse.data.login.user.userType);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
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
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading color={'white'} fontSize={'4xl'}>Sign in</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={'blackAlpha.700'}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel color={'white'} htmlFor="email">Email address</FormLabel>
                <Input 
                  border={'none'}
                  bg={'whiteAlpha.400'}
                  color={'white'}
                  placeholder=""
                  name="email"
                  type="email"
                  id="email"
                  onChange={handleChange} 
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel color={'white'}>Password</FormLabel>
                <InputGroup>                
                <Input
                    border={'none'}
                    bg={'whiteAlpha.400'}
                    color={'white'}
                    isRequired
                    placeholder=""
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    id="pwd"
                    onChange={handleChange}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      height="1.75rem"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                    {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox color={'white'}>Remember me</Checkbox>
                  <Link href="/forgot" color={'#f07167ff'}>Forgot Password</Link>
                </Stack>
                {error ? (
                  <div>
                    <p className="error-text">invalid username and/or password</p>
                  </div>
                ) : null}
                <Button
                  type="submit"
                  isLoading={isLoading}
                  disabled={isInvalid}
                  bg={'#0081a7ff'}
                  color={'white'}
                  _hover={{
                    bg: '#00afb9ff',
                  }}>
                  Sign In
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </form>
      </VStack>
    </Flex>
  );
};

export default Login;
