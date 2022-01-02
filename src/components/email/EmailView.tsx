import {
  Box,
  Stack,
  Avatar,
  Text,
  Icon,
  Heading,
  Image,
  GridItem,
  ScaleFade,
} from "@chakra-ui/react";
import { TiArrowBackOutline } from "react-icons/ti";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiStar } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";

const EmailView = () => {
  return (
    <GridItem>
      <ScaleFade initialScale={0.9} in={true}>
        <Box w={"full"} p={5} overflow={"hidden"}>
          <Stack
            my={2}
            w={"full"}
            direction={"row"}
            spacing={4}
            align={"center"}
          >
            <Avatar
              alignSelf={"flex-start"}
              src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
              alt={"Author"}
            />{" "}
            <Stack direction={"row"} fontSize={"sm"} w="full" align={"center"}>
              <Stack
                direction={"column"}
                spacing={0}
                fontSize={"sm"}
                marginRight="auto"
              >
                <Text fontWeight="bold" color={"gray.300"}>
                  Achim Rolle{"  "}
                  <Text as="span" fontWeight="normal" color={"gray.500"}>
                    to
                  </Text>{" "}
                  <Text as="span" fontWeight="bold" color={"gray.300"}>
                    achim@example.com
                  </Text>
                </Text>
              </Stack>

              <Stack direction={"row"} align={"center"} gap={2}>
                <Icon
                  color="gray.300"
                  fontSize="3xl"
                  _hover={{
                    cursor: "pointer",
                    color: "#2F75BE",
                  }}
                  as={TiArrowBackOutline}
                />
                <Icon
                  color="gray.300"
                  fontSize="2xl"
                  _hover={{
                    cursor: "pointer",
                    color: "#2F75BE",
                  }}
                  as={FaRegTrashAlt}
                />
                <Icon
                  as={FiStar}
                  color="gray.300"
                  fontSize="2xl"
                  _hover={{
                    fill: "yellow",
                    color: "yellow",
                    cursor: "pointer",
                  }}
                />
                <Icon
                  as={BsThreeDots}
                  color="gray.300"
                  fontSize="2xl"
                  _hover={{ color: "#2F75BE", cursor: "pointer" }}
                />
              </Stack>
            </Stack>
          </Stack>

          <Stack
            my={8}
            direction={"row"}
            align="center"
            justifyContent={"space-between"}
          >
            <Heading as="h1" size="lg" fontWeight="bold" mr={8} color="white">
              Senior UI Desinger at Cleanzy
            </Heading>
            <Text color="white">Today, 02th January 2022, 12:00 PM</Text>
          </Stack>

          <Stack direction={"row"} maxH={300} overflowY={"auto"}>
            <Text color={"gray.400"} pt={2} marginRight="auto">
              Hello Martha Lynch <br /> <br />
              Of all of the celestial bodies that capture our attention and
              fascination as astronomes, none has a greater influence on life on
              planet Earth than it's own satelite, the moon.When you think about
              it, we regard the moon with such powerful significance that unlike
              the moons of other planets which we give names, we only refer to
              our one and only orbiting orb as THE moon.
              <br /> <br />
              The moon works its way into our way of thinking, our feelings
              about romance our poetry and literature and even how we feel about
              our day in day our lifes in many cases.It is not only primitive
              societies that ascribe mood swings, changes, in social conduct and
              changes in weather to the moon.
            </Text>
          </Stack>

          <Stack
            direction="row"
            my={16}
            borderTop="1px dashed white"
            paddingTop={6}
          >
            <Image
              boxSize="100px"
              objectFit="cover"
              src="https://bit.ly/dan-abramov"
              alt="Dan Abramov"
            />
          </Stack>
        </Box>
      </ScaleFade>
    </GridItem>
  );
};

export default EmailView;
