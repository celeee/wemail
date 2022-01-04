import { Box, Badge, Text, Stack, Avatar, Icon } from "@chakra-ui/react";
import { FiStar } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { formatTimestamp } from "../../utils/formatTimestamp";

import { IEmail } from "./InboxContainer";

interface IProps {
  email: IEmail;
}

const InboxCard = ({ email }: IProps) => {
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
      onClick={() => navigate(`${pathname}?id=${email.docId}`)}
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
                {email.from}
              </Text>
              <Text color={"white"} fontWeight={600} fontSize={"lg"}>
                {email.subject}
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
                {formatTimestamp(email.timestamp)}
              </Badge>
            </Stack>
          </Stack>

          <Stack direction={"row"}>
            <Text color={"gray.400"} pt={2} marginRight="auto">
              {email.message}
            </Text>
            <Icon
              as={FiStar}
              fontSize="14"
              fill={email?.isImportant ? "yellow" : "none"}
              stroke={email?.isImportant ? "yellow" : "white"}
              _hover={{ fill: "yellow", stroke: "yellow" }}
              onClick={() => console.log("important")}
            />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default InboxCard;
