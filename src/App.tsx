import { Box, Grid, GridItem } from "@chakra-ui/react";
import Header from "./components/header/Header";
import NavigationBar from "./components/navigation/NavigationBar";

function App() {
  return (
    <Box>
      <Header />
      <Grid templateColumns="200px 1fr" gap={2} background="#323542">
        <GridItem>
          <NavigationBar />
        </GridItem>
        <GridItem>2</GridItem>
      </Grid>
    </Box>
  );
}

export default App;
