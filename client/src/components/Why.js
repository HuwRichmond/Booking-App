import { ReactNode } from 'react';
import image from '../assets/images/pexels-pixabay-220455.jpg';
import {
  Stack,
  Container,
  Box,
  Flex,
  Text,
  Heading,
  SimpleGrid,
} from '@chakra-ui/react';

export default function StatsGridWithImage() {
  return (
    <Box zIndex={0} id='whyus' pl={{base: 0, md: 10}} bg={"gray.800"} position={"relative"}>
      <Flex
        flex={1}
        zIndex={0}
        display={{ base: "none", lg: "flex" }}
        backgroundImage={image}
        backgroundSize={"cover"}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        position={"absolute"}
        width={"100%"}
        insetY={0}
        right={0}
      >
        <Flex
          bgGradient={"linear(to-r, gray.800 30%, transparent)"}
          w={"full"}
          h={"full"}
        />
      </Flex>
      <Container align={'left'} maxW={"7xl"} zIndex={10} position={"relative"}>
        <Stack direction={{ base: "column", lg: "row" }}>
          <Stack
            flex={1}
            color={"gray.400"}
            justify={{ lg: "center" }}
            py={{ base: 4, md: 20, xl: 60 }}
          >
            <Box mb={{ base: 8, md: 20 }}>
              <Text
                fontFamily={"heading"}
                fontWeight={700}
                textTransform={"uppercase"}
                mb={3}
                fontSize={{ base: "xl", md: "2xl" }}
                color={"#f07167ff"}
              >
                What makes us different?
              </Text>
              <Heading
                color={"white"}
                mb={5}
                fontSize={{ base: "3xl", md: "5xl" }}
              >
                Our dogs deserve to have as much fun as we do
              </Heading>
              <Text fontSize={"xl"} color={"#00afb9ff"}>
                Scruffy Muffins are about providing dogs with enjoyable, memorable and engaging
                activities. We treat all dogs like our own and give every dog in our care the 
                love and care they deserve.
              </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              {stats.map((stat) => (
                <Box key={stat.title}>
                  <Text
                    fontFamily={"heading"}
                    fontSize={"3xl"}
                    color={"white"}
                    mb={3}
                  >
                    {stat.title}
                  </Text>
                  <Text fontSize={"xl"} color={"gray.400"}>
                    {stat.content}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
          <Flex flex={1} />
        </Stack>
      </Container>
    </Box>
  );
}

const StatsText = ({ dogs }: { dogs: ReactNode }) => (
  <Text as={'span'} fontWeight={700} color={'#fed9b7ff'}>
    {dogs}
  </Text>
);

const stats = [
  {
    title: '128+',
    content: (
      <>
        <StatsText>Services</StatsText> details about services provided.
      </>
    ),
  },
  {
    title: '5,030',
    content: (
      <>
        <StatsText>Members</StatsText> information about a membership body.
      </>
    ),
  },
  {
    title: '185+',
    content: (
      <>
        <StatsText>Professional</StatsText> staff section.
      </>
    ),
  },
  {
    title: '680+',
    content: (
      <>
        <StatsText>Dogs</StatsText> special requests that can be accommodated.
      </>
    ),
  },
];