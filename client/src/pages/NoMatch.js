import { Box, Heading, Text, Button } from '@chakra-ui/react';

function NotMatch() {
  return (
    <Box textAlign="center" bg={'gray.900'} py={180} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, #f07167ff, #0081a7ff)"
        backgroundClip="text">
        404
      </Heading>
      <Text color={'white'} fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={'#f07167ff'} mb={6}>
        The page you're looking for does not seem to exist
      </Text>

      <Button
        as={'a'}
        href={'/'}
        colorScheme="teal"
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
        color="white"
        variant="solid"
        _hover={{
          color: 'white',
          bg: 'teal.600',
        }} >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotMatch;