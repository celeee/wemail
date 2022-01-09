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
import { useLocation } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import { IEmail } from "../inbox/InboxContainer";
import {
  useGetEmailByTypeQuery,
  useUpdateEmailMutation,
} from "../../api/firebase";
import { formatTimestamp } from "../../utils/formatTimestamp";
import { useEffect, useState } from "react";
import { generateFirebaseQuery } from "../inbox/generateFirebaseQuery";
import { useAppSelector } from "../../store/hooks";
import { selectCurrentUser } from "../../store/auth/authSlice";

enum EPathname {
  inbox = "inbox",
  important = "important",
  drafts = "drafts",
  "sent-mail" = "sent-mail",
}

const EmailView = () => {
  const location = useLocation();
  const pathname = location.pathname.slice(1) as EPathname;
  const currentUser = useAppSelector(selectCurrentUser);

  let query = useQuery();

  const { email } = useGetEmailByTypeQuery(
    generateFirebaseQuery(pathname, currentUser),
    {
      selectFromResult: ({ data }) => ({
        email: data?.find(
          (email: IEmail) => email.docId === query.get("id")
        ) as IEmail,
      }),
    }
  );
  const [isEmailImportant, setEmailImpornant] = useState<boolean | null>(false);
  const [updateEmail] = useUpdateEmailMutation();

  useEffect(() => {
    setEmailImpornant(email?.isImportant);
    return () => {
      console.log("******************* UNMOUNTED");
      setEmailImpornant(null);
    };
  }, [email?.isImportant]);

  const handleEmailImportant = () => {
    setEmailImpornant(prev => {
      updateEmail({ docId: email.docId, isImportant: !prev });
      return !prev;
    });
  };

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
                  {email?.from}
                  {"  "}
                  <Text as="span" fontWeight="normal" color={"gray.500"}>
                    to
                  </Text>{" "}
                  <Text as="span" fontWeight="bold" color={"gray.300"}>
                    {email?.recipients}
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
                  fill={isEmailImportant ? "yellow" : "none"}
                  stroke={isEmailImportant ? "yellow" : "white"}
                  fontSize="2xl"
                  _hover={{
                    fill: "yellow",
                    stroke: "yellow",
                    color: "yellow",
                    cursor: "pointer",
                  }}
                  onClick={handleEmailImportant}
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
              {email?.subject}
            </Heading>
            {/* <Text color="white">Today, 02th January 2022, 12:00 PM</Text> */}
            <Text color="white">
              {email && formatTimestamp(email.timestamp)}
            </Text>
          </Stack>

          <Stack direction={"row"} maxH={300} overflowY={"auto"}>
            <Text color={"gray.400"} pt={2} marginRight="auto">
              {/* Hello Martha Lynch <br /> <br />
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
              changes in weather to the moon. */}
              {email?.message}
            </Text>
          </Stack>

          {/* <Stack
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
          </Stack> */}
        </Box>
      </ScaleFade>
    </GridItem>
  );
};

export default EmailView;
