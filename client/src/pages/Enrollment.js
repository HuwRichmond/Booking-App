import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
// import { Box, Heading, Text } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useQuery } from '@apollo/client';
import { GET_DETAILS_FOR_ENROLLMENT } from '../utils/queries';
import rotate from '../assets/images/rotate.gif';
import image from '../assets/images/pexels-pixabay-48794.jpg';
import {
  Box,
  Stack,
  Text,
  Flex,
  VStack,
  Button,
  Heading,
  Select,
  StackDivider,
  Checkbox,
  CheckboxGroup,
  useBreakpointValue,
  Tabs, TabList, TabPanels, Tab, TabPanel ,
  Image,
  HStack,
  FormControl,
  FormLabel,
  Input,
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
// import Moment from 'react-moment';
import changeDate, {formatDate} from '../utils/check';


export default function Enrollment() {

   const { enrollmentCode } = useParams();
     console.log(enrollmentCode)
   const { loading, data } = useQuery(GET_DETAILS_FOR_ENROLLMENT, {
    variables: { enrollmentCode: enrollmentCode },
  });

  const enquiry = data?.searchEnrollmentLink || {};

  const [formState, setFormState] = useState({});
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleChangeDays = (event) => {
    setFormState({
      ...formState,
      ["reqdays"]: event,
    });
  }


  const vall= formatDate(enquiry.dogDateOfBirth);
  const requestedDays = [enquiry.requestedDays];
  // const requestDay = enquiry.map((i) => {return i})
  console.log("RequestesDays", requestedDays);
  // const test =(event) =>{
  //   for (var i=0; i<requestedDays.length; i++){
  //     console.log(i,requestedDays[i])
  //   }
  // }
  return (
    <Flex
          pt={{ base: 10, md: 0 }}
          w={'full'}
          h={'100vh'}
          backgroundImage={image}
          backgroundSize={'cover'}
          backgroundPosition={'center center'}>
      <Image w={'100vh'} h={'full'} display={{ base: 'flex', sm: 'none' }} src={rotate} />
      <VStack
            display={{ base: 'none', sm: 'flex' }}
            w={'full'}
            justify={'top'}
            px={useBreakpointValue({ base: 4, md: 8 })}
            bgGradient={'linear(to-r, blackAlpha.800, transparent)'}>
              
              <Stack display={{ base: 'none', sm: 'flex' }} spacing={4} mx={'auto'} maxW={'3xl'} py={12} px={2}>
                <Stack align={'center'}>
                  <Heading color={'white'} fontSize={'4xl'} textAlign={'center'}>
                    Enquiry Details 
                  </Heading>
                  <Text fontSize={'lg'} color={'white'}>
                    Confirm your details to sign up
                  </Text>
                </Stack>
              </Stack>
              <Tabs variant='soft-rounded' colorScheme='green' isFitted>
                <TabList>
                  <Tab color={'white'}>Dog Details</Tab>
                  <Tab color={'white'}>Owner Details</Tab>
                  <Tab color={'white'}>Emergency Contact</Tab>
                </TabList>
                <form>
                <TabPanels>
                  <TabPanel>                   
                    <Box rounded={'lg'} bg={'blackAlpha.700'} boxShadow={'lg'} p={8}>
                      <Stack spacing={4}>
                          <HStack spacing={10}>
                            <Box>
                              <FormControl id="firstName" width={"18rem"} isRequired>
                                <FormLabel color={'white'}>Dog's First Name</FormLabel>
                                <Input border={'none'} bg={'whiteAlpha.400'} color={'white'} placeholder="" name="cFirstName" type="firstName" id="firstName" value={enquiry.dogFirstName} onChange={handleChange} />
                              </FormControl>
                            </Box>
                            <Box>
                              <FormControl id="lastName" width={"18rem"} isRequired>
                                <FormLabel color={'white'}>Dog's Last Name</FormLabel>
                                <Input border={'none'} bg={'whiteAlpha.400'} color={'white'}  placeholder="" name="cLastName" type="lastName" id="lastName" value={enquiry.dogLastName} onChange={handleChange}/>
                              </FormControl>
                            </Box>
                          </HStack>
                        </Stack>
                        <Stack spacing={4}>
                          <FormControl id="cAddress1" isRequired>
                            <FormLabel color={'white'}>Address</FormLabel>
                            <Input border={'none'} bg={'whiteAlpha.400'} color={'white'} placeholder="" name="cAddress1" value={enquiry.addressLine1} onChange={handleChange} />
                          </FormControl>
                          <FormControl id="address2">
                            <Input border={'none'} bg={'whiteAlpha.400'} color={'white'} placeholder="" name="cAddress2" type="address2" value={enquiry.addressLine2} onChange={handleChange} />
                          </FormControl>
                        </Stack>
                        <HStack>
                          <FormControl id="suburb" isRequired>
                            <FormLabel color={'white'}>Suburb</FormLabel>
                            <Input border={'none'} bg={'whiteAlpha.400'} color={'white'} placeholder="" name="cSuburb" type="suburb" value={enquiry.suburb} onChange={handleChange}
                            />
                          </FormControl>
                          <Box>
                            <FormControl id="state" width={"10rem"} isRequired>
                              <FormLabel color={'white'}>State</FormLabel>
                              <Select name="cState" border={'none'} bg={'whiteAlpha.600'} color={'black'} placeholder="" value={enquiry.state} onChange={handleChange} >
                                <option value=''>Select State</option>
                                <option value='act'>ACT</option>
                                <option value='nsw'>NSW</option>
                                <option value='nt'>NT</option>
                                <option value='qld'>QLD</option>
                                <option value='tas'>TAS</option>
                                <option value='vic'>VIC</option>
                                <option value='wa'>WA</option>
                              </Select>
                            </FormControl>
                          </Box>
                          <FormControl id="postcode" width={"12rem"} isRequired>
                            <FormLabel color={'white'}>Post Code</FormLabel>
                            <Input border={'none'} bg={'whiteAlpha.400'} color={'white'} placeholder="" name="cPostCode" value={enquiry.postCode} type="postcode" onChange={handleChange} />
                            </FormControl>
                    </HStack>
                    <HStack spacing={12}>
                    <Box>
                      <FormControl id="dob" isRequired>
                        <FormLabel color={'white'}>Dog's Date of Birth</FormLabel>
                        
                        <Input
                        // value={<Moment color={'white'} date="03/08/2022" format="YYYY/MM/DD"/>}
                          value={vall}
                          border={'none'}
                          bg={'whiteAlpha.600'}
                          color={'black'}
                          name="dob"
                          type="date"
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl id="reqdays">
                        <FormLabel color={'white'}>Days Requested</FormLabel>    
                        {/* {requestedDays.forEach(m =>{<FormLabel>Murad {console.log("Mradsa",m[0])} </FormLabel>})} */}
                          <CheckboxGroup name="checkdays" colorScheme='green' onChange={handleChangeDays} >
                            <Stack spacing={[1, 5]} direction={['column', 'row']}>
                              {/* {requestedDays.map((m) => (
                                m.forEach(element =>
                                <Checkbox color={'white'} value={element}>{element}</Checkbox>  
                                )
                              ))} */}

                              <Checkbox color={'white'} value='Mon'>Mon</Checkbox>
                              <Checkbox color={'white'} value='Tues'>Tues</Checkbox>
                              <Checkbox color={'white'} value='Wed'>Wed</Checkbox>
                              <Checkbox color={'white'} value='Thur'>Thur</Checkbox>
                              <Checkbox color={'white'} value='Fri'>Fri</Checkbox>
                            </Stack>
                          </CheckboxGroup>
                        </FormControl>
                    </Box>
                  </HStack>
                  </Box>
                  </TabPanel>
                                {/* //Dog Owner's Details */}
                  <TabPanel>
                  <Box rounded={'lg'} bg={'blackAlpha.700'} boxShadow={'lg'} p={8}>
                  <FormLabel color={'white'} fontSize="30px">Owner 1</FormLabel>
                  <Stack spacing={3}>  
                      <Stack spacing={3}>
                          <HStack spacing={10}>
                            <Box>
                              <FormControl id="parentFirstName" width={"18rem"} isRequired>
                                <FormLabel color={'white'}>Owner's First Name</FormLabel>
                                <Input border={'none'} bg={'whiteAlpha.400'} color={'white'} placeholder="" name="cFirstName" type="firstName" id="firstName" value={enquiry.firstName} onChange={handleChange} />
                              </FormControl>
                            </Box>
                            <Box>
                              <FormControl id="parentLastName" width={"18rem"} isRequired>
                                <FormLabel color={'white'}>Owner's Last Name</FormLabel>
                                <Input border={'none'} bg={'whiteAlpha.400'} color={'white'}  placeholder="" name="cLastName" type="lastName" id="lastName" value={enquiry.lastName} onChange={handleChange}/>
                              </FormControl>
                            </Box>
                          </HStack>
                        </Stack>
                      
                        <Stack spacing={3}>
                          <FormControl id="cAddress1" isRequired>
                            <FormLabel color={'white'}>Address</FormLabel>
                            <Input border={'none'} bg={'whiteAlpha.400'} color={'white'} placeholder="" name="cAddress1" value={enquiry.addressLine1} onChange={handleChange} />
                          </FormControl>
                          <FormControl id="address2">
                            <Input border={'none'} bg={'whiteAlpha.400'} color={'white'} placeholder="" name="cAddress2" type="address2" value={enquiry.addressLine2} onChange={handleChange} />
                          </FormControl>
                        </Stack>
                        <HStack>
                          <FormControl id="suburb" isRequired>
                            <FormLabel color={'white'}>Suburb</FormLabel>
                            <Input border={'none'} bg={'whiteAlpha.400'} color={'white'} placeholder="" name="cSuburb" type="suburb" value={enquiry.suburb} onChange={handleChange}
                            />
                          </FormControl>
                          <Box>
                            <FormControl id="state" width={"10rem"} isRequired>
                              <FormLabel color={'white'}>State</FormLabel>
                              <Select name="cState" border={'none'} bg={'whiteAlpha.600'} color={'black'} placeholder="" value={enquiry.state} onChange={handleChange} >
                                <option value=''>Select State</option>
                                <option value='act'>ACT</option>
                                <option value='nsw'>NSW</option>
                                <option value='nt'>NT</option>
                                <option value='qld'>QLD</option>
                                <option value='tas'>TAS</option>
                                <option value='vic'>VIC</option>
                                <option value='wa'>WA</option>
                              </Select>
                            </FormControl>
                          </Box>
                          <FormControl id="postcode" width={"12rem"} isRequired>
                            <FormLabel color={'white'}>Post Code</FormLabel>
                            <Input border={'none'} bg={'whiteAlpha.400'} color={'white'} placeholder="" name="cPostCode" value={enquiry.postCode} type="postcode" onChange={handleChange} />
                            </FormControl>
                    </HStack>
                    <FormLabel color={'white'} fontSize="30px">Owner 2</FormLabel>
                    {/* //Parent 2 */}
                    <Stack spacing={3}>
                          <HStack spacing={10}>
                            <Box>
                              <FormControl id="parentFirstName" width={"18rem"} isRequired>
                                <FormLabel color={'white'}>Owner's First Name</FormLabel>
                                <Input border={'none'} bg={'whiteAlpha.400'} color={'white'} placeholder="" name="cFirstName" type="firstName" id="firstName" value={enquiry.firstName} onChange={handleChange} />
                              </FormControl>
                            </Box>
                            <Box>
                              <FormControl id="parentLastName" width={"18rem"} isRequired>
                                <FormLabel color={'white'}>Owner's Last Name</FormLabel>
                                <Input border={'none'} bg={'whiteAlpha.400'} color={'white'}  placeholder="" name="cLastName" type="lastName" id="lastName" value={enquiry.lastName} onChange={handleChange}/>
                              </FormControl>
                            </Box>
                          </HStack>
                        </Stack>
                      
                        <Stack spacing={3}>
                          <FormControl id="cAddress1" isRequired>
                            <FormLabel color={'white'}>Address</FormLabel>
                            <Input border={'none'} bg={'whiteAlpha.400'} color={'white'} placeholder="" name="cAddress1" value={enquiry.addressLine1} onChange={handleChange} />
                          </FormControl>
                          <FormControl id="address2">
                            <Input border={'none'} bg={'whiteAlpha.400'} color={'white'} placeholder="" name="cAddress2" type="address2" value={enquiry.addressLine2} onChange={handleChange} />
                          </FormControl>
                        </Stack>
                        <HStack>
                          <FormControl id="suburb" isRequired>
                            <FormLabel color={'white'}>Suburb</FormLabel>
                            <Input border={'none'} bg={'whiteAlpha.400'} color={'white'} placeholder="" name="cSuburb" type="suburb" value={enquiry.suburb} onChange={handleChange}
                            />
                          </FormControl>
                          <Box>
                            <FormControl id="state" width={"10rem"} isRequired>
                              <FormLabel color={'white'}>State</FormLabel>
                              <Select name="cState" border={'none'} bg={'whiteAlpha.600'} color={'black'} placeholder="" value={enquiry.state} onChange={handleChange} >
                                <option value=''>Select State</option>
                                <option value='act'>ACT</option>
                                <option value='nsw'>NSW</option>
                                <option value='nt'>NT</option>
                                <option value='qld'>QLD</option>
                                <option value='tas'>TAS</option>
                                <option value='vic'>VIC</option>
                                <option value='wa'>WA</option>
                              </Select>
                            </FormControl>
                          </Box>
                          <FormControl id="postcode" width={"12rem"} isRequired>
                            <FormLabel color={'white'}>Post Code</FormLabel>
                            <Input border={'none'} bg={'whiteAlpha.400'} color={'white'} placeholder="" name="cPostCode" value={enquiry.postCode} type="postcode" onChange={handleChange} />
                            </FormControl>
                    </HStack>
                  </Stack>
                  </Box>
                  </TabPanel>

                  <TabPanel>
                    <Box rounded={'lg'} bg={'blackAlpha.700'} boxShadow={'lg'} p={8}>
                    <FormLabel color={'white'} fontSize="30px">Emergency Contact Details</FormLabel>
                    <Stack spacing={3}>  
                        <Stack spacing={3}>
                            <HStack spacing={10}>
                              <Box>
                                <FormControl id="eFirstName" width={"18rem"} isRequired>
                                  <FormLabel color={'white'}>First Name</FormLabel>
                                  <Input border={'none'} bg={'whiteAlpha.400'} color={'white'} placeholder="" name="cFirstName" type="firstName" id="firstName" value={enquiry.firstName} onChange={handleChange} />
                                </FormControl>
                              </Box>
                              <Box>
                                <FormControl id="eLastName" width={"18rem"} isRequired>
                                  <FormLabel color={'white'}>Last Name</FormLabel>
                                  <Input border={'none'} bg={'whiteAlpha.400'} color={'white'}  placeholder="" name="cLastName" type="lastName" id="lastName" value={enquiry.lastName} onChange={handleChange}/>
                                </FormControl>
                              </Box>
                            </HStack>
                          </Stack>
                        
                          <HStack>
                            <Box>
                              <FormControl id="conType" width={"10rem"} isRequired>
                                <FormLabel color={'white'}>Contact Method</FormLabel>
                                <Select name="conType" border={'none'} bg={'whiteAlpha.600'} color={'black'} placeholder="" value={enquiry.ctype} onChange={handleChange} >
                                  <option value=''>Select Type</option>
                                  <option value='phone'>Phone</option>
                                  <option value='mobile'>Mobile</option>
                                  <option value='email'>Email</option>
                                </Select>
                              </FormControl>
                            </Box>
                            <FormControl width={"15rem"} id="eEmail" isRequired>
                              <FormLabel color={'white'}>Email</FormLabel>
                              <Input border={'none'} bg={'whiteAlpha.400'} color={'white'} placeholder="" name="eEmail" type="email" value={enquiry.email} onChange={handleChange}
                              />
                            </FormControl>
                            <FormControl id="eContact" width={"12rem"} isRequired>
                              <FormLabel color={'white'}>Contact No.</FormLabel>
                              <Input border={'none'} bg={'whiteAlpha.400'} color={'white'} placeholder="" name="eContact" value={enquiry.contact} type="contact" onChange={handleChange} />
                              </FormControl>
                      </HStack>
                    </Stack>
                    </Box>
                  </TabPanel>
                </TabPanels>
                </form>
              </Tabs>
      </VStack>
    </Flex>
  );
}