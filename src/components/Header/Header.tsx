import React, { useState } from "react";
import {
  Heading,
  Input,
  Button,
  Flex,
  FormControl,
  HStack,
  Menu,
  MenuButton,
  VStack,
  Avatar,
  Text,
  MenuList,
  MenuItem,
  MenuDivider,
  Box,
  Container,
  Center,
  AvatarBadge,
} from "@chakra-ui/react";
import { SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectCurrentUser } from "../../store/auth/authSlice";
import { BsCamera } from "react-icons/bs";

const Header = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submit");
    console.log(searchTerm);
  };

  return (
    <header
      style={{
        background: "#323542",
        borderBottom: "2px solid #272A35",
      }}
    >
      <Container maxW="container.xl">
        <Flex alignItems="center" h="4rem">
          <Heading
            as={Link}
            to="/"
            size="lg"
            fontWeight="bold"
            mr={8}
            color="white"
          >
            WeMail
          </Heading>

          <form onSubmit={handleSubmit}>
            <FormControl display="flex">
              <Input
                placeholder="Search for messages..."
                variant="outline"
                color="white"
                mr={2}
                value={searchTerm}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(event.target.value)
                }
              />
              <Button variant="solid" colorScheme="blue" type="submit">
                <SearchIcon />
              </Button>
            </FormControl>
          </form>

          <HStack spacing={{ base: "0", md: "6" }} ml="auto">
            <Flex alignItems={"center"}>
              <Menu>
                <MenuButton
                  py={2}
                  transition="all 0.3s"
                  _focus={{ boxShadow: "none" }}
                >
                  <HStack>
                    <Avatar
                      name={currentUser?.fullName}
                      size={"sm"}
                      src={currentUser?.photoURL}
                    />
                    <VStack
                      display={{ base: "none", md: "flex" }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="2"
                    >
                      <Text fontSize="sm" color="white">
                        {currentUser?.fullName}
                      </Text>
                    </VStack>
                    <Box display={{ base: "none", md: "flex" }}>
                      <ChevronDownIcon color="white" />
                    </Box>
                  </HStack>
                </MenuButton>
                <MenuList>
                  <Center py={4}>
                    <Box maxW={"320px"} w={"full"} textAlign={"center"}>
                      <Avatar
                        name={currentUser?.fullName}
                        size={"xl"}
                        src={currentUser?.photoURL}
                        alt={"Avatar Alt"}
                        mb={4}
                      >
                        <AvatarBadge
                          boxSize="1em"
                          bg="white"
                          border="8px"
                          boxShadow={"dark-lg"}
                          color="black"
                        >
                          <BsCamera />
                        </AvatarBadge>
                      </Avatar>
                      <Heading fontSize={"2xl"} fontFamily={"body"}>
                        {currentUser?.fullName}
                      </Heading>
                      <Text fontWeight={600} color={"gray.500"}>
                        {currentUser?.email}
                      </Text>
                    </Box>
                  </Center>

                  <MenuDivider />
                  <MenuItem>Sign out</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </HStack>
        </Flex>
      </Container>
    </header>
  );
};

export default Header;
