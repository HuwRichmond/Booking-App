import React from "react";
import image from "../assets/images/pexels-pixabay-277477.jpg";
// Import the `useParams()` hook from React Router
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { QUERY_SINGLE_ENQUIRY } from "../utils/queries";
import { SEND_ENROLLMENT_LINK } from "../utils/mutations";

import {
  Box,
  Stack,
  chakra,
  Text,
  Flex,
  VStack,
  Button,
  Heading,
  StackDivider,
  useBreakpointValue,
  
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  // useColorModeValue,
  // VisuallyHidden,
} from "@chakra-ui/react";
// import { MdLocalShipping } from 'react-icons/md';

const SingleEnquiry = () => {
  // Use `useParams()` to retrieve value of the route parameter `:enquiryId`
  const { enquiryId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isNewOpen, onNewOpen} = useDisclosure();
  // Use `useQury` to retrieve apollo query for a single enquiry
  const { loading, data } = useQuery(QUERY_SINGLE_ENQUIRY, {
    variables: { enquiryId: enquiryId },
  });

  const [sendEnrollmentLink] =useMutation(SEND_ENROLLMENT_LINK);

  const enquiry = data?.enquiry || {};

  const handleSendEnrollmentLink =async (event) =>{    
    const mutationResponse = await sendEnrollmentLink({
      variables: { enquiryId: enquiryId },
    });

    onOpen();
    console.log(mutationResponse);
  }

  const handleClose= async (event) =>{
    window.location.replace('/dashboard');
  }

  return (
    <Flex
      w={"full"}
      h={"full"}
      backgroundImage={image}
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
    >
      <VStack
        w={"full"}
        justify={"center"}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={"linear(to-r, blackAlpha.800, transparent)"}
      >
        <Stack
            mt={50}
            spacing={{ base: 6, md: 10 }}
            mx={"auto"}
            maxW={"lg"}
            py={12}
            px={6}
        >
            {loading ? (
            <Text
                fontFamily={"heading"}
                fontWeight={700}
                textTransform={"uppercase"}
                fontSize={{ base: "xl", md: "2xl" }}
                color={"#f07167ff"}
            >
                Loading...
            </Text>
            ) : (
            <>
            <Stack align={"center"}>
            <Heading color={"#f07167ff"} fontSize={"4xl"}>
                Enquiry Details
            </Heading>
            </Stack>
            <Box rounded={"lg"} bg={"blackAlpha.700"} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
                <Heading
                color={"#00afb9ff"}
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "2xl", md: "4xl" }}
                >
                {enquiry.firstName} {enquiry.lastName}
                </Heading>
                <Text
                color={"gray.400"}
                textTransform={"uppercase"}
                fontWeight={300}
                fontSize={"2xl"}
                >
                {enquiry.addressLine1}, {enquiry.suburb}, {enquiry.state}{" "}
                {enquiry.postCode}
                </Text>
            </Stack>
            </Box>

            <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={<StackDivider borderColor={"gray.600"} />}
            >
            <VStack spacing={{ base: 4, sm: 6 }} alignSelf={'center'} w={{base: 'none', md: '90vh'}} rounded={"lg"} bg={"blackAlpha.700"} boxShadow={"lg"} p={8}>
                <Text color={"white"} fontSize={"2xl"} fontWeight={"300"}>
                Applied to enrol their dog <chakra.span fontWeight={'bold'} color={'#fed9b7ff'}>{enquiry.childFirstName}{" "}
                {enquiry.childLastName}</chakra.span> on {enquiry.createdAt} for{" "}
                <chakra.span fontWeight={'bold'} color={'#00afb9ff'}>
                {enquiry.branch.map((m) => m.branchName)}.</chakra.span>
                </Text>
                <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={"yellow.300"}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
                >
                {console.log(enquiry.branchRoom)}
                Please check the capacity in room{" "}
                <chakra.span color={'red'}>
                    {enquiry.branchRoom.map((m) => m.roomName)}
                </chakra.span>this room has space for{" "}
                <chakra.span fontWeight={'bold'} color={'red'}>
                    {enquiry.branchRoom.map((m) => m.roomCapacity)}
                </chakra.span>. And contact at their
                phone number i.e. <chakra.span fontWeight={'bold'} color={'white'}>
                    {enquiry.phone}
                </chakra.span> or email at{" "}
                <chakra.span fontWeight={'bold'} color={'white'}>
                {enquiry.email}
                </chakra.span> for confirmation.
                </Text>
            </VStack>
            </Stack>
            <Flex
              spacing={8} 
              flexDirection={{ base:'column', md:'row' }}
              alignSelf={'center'}
            >
              <Stack px={2}>
                <Button
                  rounded={"md"}
                  w={"full"}
                  mt={4}
                  size={"lg"}
                  py={"4"}
                  bg={'#0081a7ff'}
                  color={"white"}
                  onClick={handleSendEnrollmentLink}
                  textTransform={"uppercase"}
                  _hover={{
                      bg: '#00afb9ff',
                      transform: "translateY(2px)",
                      boxShadow: "lg",
                  }}
                >
                Send enrolment form
                </Button>
              </Stack>
              <Stack px={2}>
                <Button
                  rounded={"md"}
                  w={"full"}
                  mt={4}
                  size={"lg"}
                  py={"4"}
                  bg={'#f07167ff'}
                  color={"white"}
                  textTransform={"uppercase"}
                  _hover={{
                      bg: '#fed9b7ff',
                      color: 'gray.900',
                      transform: "translateY(2px)",
                      boxShadow: "lg",
                  }}
                >
                Add to wait list
                </Button>
              </Stack>
            </Flex>
            {/* <Stack
                direction="row"
                alignItems="center"
                justifyContent={"center"}
            >
                <MdLocalShipping />
                <Text>2-3 business days delivery</Text>
            </Stack> */}
            </>
        )}
        </Stack>
      </VStack>
      <Modal isOpen={isOpen} onClose={handleClose}>
          <ModalOverlay />
          <ModalContent  >
            <ModalHeader>Confirmation</ModalHeader>
            <ModalCloseButton />
            <ModalBody  >
              Enrollment link sent.
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={handleClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </Flex>
  );
};

export default SingleEnquiry;
