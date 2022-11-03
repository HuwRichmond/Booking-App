import React, { useEffect } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

export default function Success() {

useEffect(() => {

    setTimeout(() => {
    window.location.assign('/');
    }, 2000);
}, []);

  return (
    <Box pt={{ base: 20, md: 10 }} textAlign="center" px={6}>
      <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
      <Heading color={'white'} as="h2" size="xl" mt={6} mb={2}>
        Submitted!
      </Heading>
      <Text fontSize={26} color={'gray.500'}>
        Thanks fpr your enquiry, we will contact you with login details.
      </Text>
    </Box>
  );
}