import { Box, Flex, Button } from '@chakra-ui/react';
import NavigationList from './NavigationList/NavigationList';

const NavigationBar = (): JSX.Element => {
  return (
    <Box as="aside" h="full">
      <Flex align="center" p="4">
        <Button colorScheme="blue" w="full">
          New Mail
        </Button>
      </Flex>

      <NavigationList />
    </Box>
  );
};

export default NavigationBar;
