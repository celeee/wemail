import { Box, Flex, Button } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import NavigationList from "./NavigationList/NavigationList";

const NavigationBar = (): JSX.Element => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Box as="aside" h="full">
      <Flex align="center" p="4">
        <Button
          colorScheme="blue"
          w="full"
          onClick={() => navigate(`${pathname}?compose=new`)}
        >
          New Mail
        </Button>
      </Flex>

      <NavigationList />
    </Box>
  );
};

export default NavigationBar;
