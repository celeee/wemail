import { Box, Badge, Text, Stack, Avatar, Icon } from "@chakra-ui/react";
import { FiStar } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

const InboxCard = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Box
      w={"full"}
      bg={"#2D2F3C"}
      boxShadow={"md"}
      rounded={"md"}
      p={5}
      overflow={"hidden"}
      onClick={() => navigate(`${pathname}?id=1`)}
    >
      <Stack my={2} direction={"row"} spacing={4} align={"center"}>
        <Avatar
          alignSelf={"flex-start"}
          src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
          alt={"Author"}
        />{" "}
        <Stack direction={"column"} spacing={0} fontSize={"sm"} w={"full"}>
          <Stack direction={"row"} fontSize={"sm"}>
            <Stack
              direction={"column"}
              spacing={0}
              fontSize={"sm"}
              marginRight="auto"
            >
              <Text fontWeight={600} color={"gray.500"}>
                Achim Rolle
              </Text>
              <Text color={"white"} fontWeight={600} fontSize={"lg"}>
                Modern Website Layout Ideas
              </Text>
            </Stack>

            <Stack>
              <Badge
                marginTop={2}
                marginLeft={"4"}
                background="#323542"
                color="gray.500"
                fontWeight={600}
                px={2}
                py={0.5}
                rounded={"xl"}
              >
                9:30 AM
              </Badge>
            </Stack>
          </Stack>

          <Stack direction={"row"}>
            <Text color={"gray.400"} pt={2} marginRight="auto">
              {`Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum.`.substring(0, 110) + "..."}
            </Text>
            <Icon as={FiStar} fontSize="14" _hover={{ fill: "yellow" }} />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default InboxCard;
