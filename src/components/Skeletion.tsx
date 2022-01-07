import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

export default function Skeletion() {
  return (
    <Box padding="6" boxShadow="lg" bg="white" flexDirection={"row"}>
      <SkeletonCircle size="10" />
      <SkeletonText mt="4" noOfLines={4} spacing="4" />
    </Box>
  );
}
