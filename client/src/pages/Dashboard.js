import React from "react";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ENQUIRIES } from '../utils/queries';
import { REMOVE_ENQUIRY } from '../utils/mutations';
import image from '../assets/images/pexels-pixabay-289923.jpg';
// import Mod from '../components/Modal';
import {
  // Spinner,
  Button,
  ButtonGroup,
  Flex,
  Icon,
  IconButton,
  SimpleGrid,
  Stack,
  VStack,
  Text,
  chakra,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { AiFillEdit, AiTwotoneLock } from "react-icons/ai";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";

const Dashboard = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const{ loading, data } = useQuery(QUERY_ENQUIRIES);
  const [removeEnquiry, { error }] = useMutation(REMOVE_ENQUIRY);

  const enquiries = data?.enquiries || [];
  console.log(enquiries);

  const handleDeleteEnquiry = async (enquiryId) => 
  {
    try{

      await removeEnquiry({
        variables: { enquiryId: enquiryId },
      });
      window.location.reload(true);

      if (error) {
        throw new Error('something went wrong!');
      }

    } catch (err) {
      console.error(err);
    }
  };

  const bg = "blackAlpha.400";
  const bg2 = "blackAlpha.600";
  const bg3 = "blackAlpha.400";

  return (
    <Flex
    w={'full'}
    h={'100vh'}
    backgroundImage={image}
    backgroundSize={'cover'}
    backgroundPosition={'center center'}>
      <VStack
        w={'full'}
        pt={10}
        justify={'flex-start'}
        alignItems={'flex-start'}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={'linear(to-r, blackAlpha.700, transparent)'}>
        <Text
          fontFamily={"heading"}
          fontWeight={700}
          textTransform={"uppercase"}
          mb={3}
          ml={5}
          fontSize={{ base: "xl", md: "2xl" }}
          color={"#f07167ff"}
        >
          enquiries
        </Text>
        <Stack
          direction={{ base: "column" }}
          w="full"
          bg={{ md: bg }}
          shadow="lg"
        >
          {loading ? (

          <Text
            fontFamily={"heading"}
            fontWeight={700}
            textTransform={"uppercase"}
            mb={3}
            ml={5}
            fontSize={{ base: "xl", md: "2xl" }}
            color={"#f07167ff"}
          >
          Loading...
          </Text>
          ) : (
          <>
          {enquiries.map((enquiry) => (
              <Flex
                direction={{ base: "row", md: "column" }}
                pos="flex"
                bg={bg2}
                key={enquiry._id}
              >
                <SimpleGrid
                  spacingY={3}
                  columns={{ base: 1, md: 4 }}
                  w={{ base: 120, md: "full" }}
                  textTransform="uppercase"
                  bg={bg3}
                  color={"gray.500"}
                  py={{ base: 1, md: 4 }}
                  px={{ base: 2, md: 10 }}
                  fontSize="md"
                  fontWeight="hairline"
                >
                  <span>Name</span>
                  <span>Created</span>
                  <span>Data</span>
                  <chakra.span textAlign={{ md: "right" }}>Actions</chakra.span>
                </SimpleGrid>
                <SimpleGrid
                  spacingY={3}
                  columns={{ base: 1, md: 4 }}
                  w="full"
                  color={'white'}
                  py={2}
                  px={10}
                  fontWeight="hairline"
                  justifyItems={{ base: 'start', md: 'center'}}
                >
                  <chakra.span 
                    textAlign={{ base: "left" }}
                  >
                    {enquiry.firstName} {enquiry.lastName}
                  </chakra.span>
                  <chakra.span
                    textOverflow="ellipsis"
                    overflow="hidden"
                    whiteSpace="wrap"
                  >
                    {enquiry.createdAt}
                  </chakra.span>
                  <Flex>
                    <Button
                      as={'a'}
                      href={`/enquiries/${enquiry._id}`}
                      size="sm"
                      variant="solid"
                      leftIcon={<Icon as={AiTwotoneLock} />}
                      colorScheme="purple"
                      _hover={{
                        color: 'white',
                        bg: '#f07167ff'
                      }}
                    >
                      View Enquiry
                    </Button>
                  </Flex>
                  <Flex justifySelf={{ md: "flex-end" }}>
                    <ButtonGroup variant="solid" size="sm" spacing={3}>
                      <IconButton
                        href={`/enquiries/${enquiry._id}`}
                        colorScheme="blue"
                        icon={<BsBoxArrowUpRight />}
                        aria-label="Up"
                      />
                      <IconButton
                        onClick={() => {}}
                        colorScheme="green"
                        icon={<AiFillEdit />}
                        aria-label="Edit"
                      />
                      <IconButton
                        onClick={onOpen}
                        colorScheme="red"
                        variant="outline"
                        icon={<BsFillTrashFill />}
                        aria-label="Delete"
                      />
                      {onOpen ? (
                      <>                
                      <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Confirm Delete?</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                          Deleting the enquiry for {enquiry.firstName} {enquiry.lastName}
                          </ModalBody>
                
                          <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                              Close
                            </Button>
                            <Button
                              variant='ghost'
                              color={'white'}
                              bg={'#f07167ff'}
                              onClick={() => handleDeleteEnquiry(enquiry._id)}
                              _hover={{
                                bg:'#fed9b7ff',
                                color:'gray.900'
                              }}
                            >
                              Delete enquiry
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </>
                    ): null}
                    </ButtonGroup>
                  </Flex>
                </SimpleGrid>
              </Flex>
          ))}
          </>
          )}
        </Stack>
      </VStack>
    </Flex>
  );
};

export default Dashboard;
