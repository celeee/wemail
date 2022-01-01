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
} from "@chakra-ui/react";
import { SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";

const Header = () => {
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
          <Heading as="h1" size="lg" fontWeight="bold" mr={8} color="white">
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
                      size={"sm"}
                      src={
                        "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                      }
                    />
                    <VStack
                      display={{ base: "none", md: "flex" }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="2"
                    >
                      <Text fontSize="sm" color="white">
                        Justina Clark
                      </Text>
                    </VStack>
                    <Box display={{ base: "none", md: "flex" }}>
                      <ChevronDownIcon color="white" />
                    </Box>
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem>Billing</MenuItem>
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
