import React from 'react';
import image from '../assets/images/pexels-josh-willink-701014.jpg';
import Type from '../utils/Type';
import {
    Stack,
    Flex,
    Button,
    Text,
    VStack,
    useBreakpointValue,
  } from '@chakra-ui/react';
  
  const Landing = () => {

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
          bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
          <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
            <Text
              color={'#f07167ff'}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: '2xl', md: '2xl' })}>
            <Type />
            </Text>
            <Text
              align={'left'}
              color={'white'}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
              Why should humans have all the fun?
              
            </Text>
            <Stack direction={'row'}>
              <Button
                as={'a'}
                bg={'#0081a7ff'}
                href={'/enquire'}
                rounded={'full'}
                color={'white'}
                _hover={{
                  bg: '#f07167ff',
                  color: 'white' }}>
                Bookings
              </Button>
              <Button
                as={'a'}
                href={'#whyus'}
                bg={'whiteAlpha.300'}
                rounded={'full'}
                color={'white'}
                _hover={{ bg: '#fed9b7ff', color: 'black' }}>
                See more
              </Button>
            </Stack>
          </Stack>
        </VStack>
      </Flex>
    );
  };

  export default Landing;