import { InfoIcon } from "@chakra-ui/icons";
import { Box, Heading, Text } from "@chakra-ui/react";

interface IProps {
  message: string;
  info?: string;
}

function NoMessageFound({ message, info }: IProps) {
  return (
    <Box textAlign="center" py={5} px={6}>
      <InfoIcon boxSize={"50px"} color={"blue.400"} />
      <Heading as="h2" size="lg" mt={2} mb={2} color={"white"}>
        {message}
      </Heading>
      <Text color={"gray.400"}>{info}</Text>
    </Box>
  );
}

export default NoMessageFound;
