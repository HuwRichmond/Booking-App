import { ReactNode } from 'react';
import image from '../assets/images/pexels-bess-hamiti-35537.jpg';
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
    <Box
      pt={{base: 12, md: 0 }}
      zIndex={0}
      id="vision"
      pl={{ base: 0, md: 10 }}
      bg={"gray.800"}
      position={"relative"}
    >
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
      <Container align={"left"} maxW={"7xl"} zIndex={10} position={"relative"}>
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
                Our Vision
              </Text>
              <Heading
                color={"white"}
                mb={5}
                fontSize={{ base: "xl", md: "3xl" }}
              >
                Every young child experiences excellence in early education.
              </Heading>
              <Text
                fontFamily={"heading"}
                fontWeight={700}
                mb={3}
                fontSize={{ base: "xl", md: "2xl" }}
                color={"#f07167ff"}
              >
                Our Values
              </Text>
              <Text fontSize={"xl"} color={"#00afb9ff"}>
                Space for a nice vision/mission statement here
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
    title: 'Leadership',
    content: (
      <>
        <StatsText>Leadership</StatsText> this is space for a values statement. Text to follow each value.
      </>
    ),
  },
  {
    title: 'Innovation',
    content: (
      <>
        <StatsText>Innovation</StatsText> this is space for a values statement. Text to follow each value.
      </>
    ),
  },
  {
    title: 'Sustainability',
    content: (
      <>
        <StatsText>Sustainability</StatsText> this is space for a values statement. Text to follow each value.
      </>
    ),
  },
  {
    title: 'Diversity & Inclusion',
    content: (
      <>
        <StatsText>Diversity</StatsText> this is space for a values statement. Text to follow each value.
      </>
    ),
  },
];