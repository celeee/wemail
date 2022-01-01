import { Routes, Route, useParams } from 'react-router-dom';
import * as routes from './constants/routes';

// Components
import { Box, Grid, GridItem } from '@chakra-ui/react';
import Header from './components/header/Header';
import NavigationBar from './components/navigation/NavigationBar';
import Inbox from './components/inbox/InboxContainer';

function App() {
  const { id } = useParams();

  return (
    <Box>
      <Header />
      <Grid
        templateColumns={`200px ${id ? '445px 1fr' : '1fr'}`}
        gap={2}
        background="#323542"
      >
        <GridItem>
          <NavigationBar />
        </GridItem>
        <GridItem background="#2D2F3C">
          <Routes>
            <Route path={routes.HOME} element={<Inbox />}>
              <Route path={routes.INBOX} element={<Inbox />} />
              <Route path={routes.IMPORTANT} element={<Inbox />} />
              <Route path={routes.SENT_MAIL} element={<Inbox />} />
              <Route path={routes.DRAFTS} element={<Inbox />} />
              <Route path={routes.SPAM} element={<Inbox />} />
            </Route>
          </Routes>
        </GridItem>
        {id && <GridItem>Inbox View</GridItem>}
      </Grid>
    </Box>
  );
}

export default App;
