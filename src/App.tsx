import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ScaleFade } from "@chakra-ui/react";

import * as routes from "./constants/routes";

// Components
import { Box, Grid, GridItem } from "@chakra-ui/react";
import Header from "./components/header/Header";
import NavigationBar from "./components/navigation/NavigationBar";
import Inbox from "./components/inbox/InboxContainer";
import EmailView from "./components/email/EmailView";

import useQuery from "./hooks/useQuery";

function App() {
  const { search } = useLocation();
  const [id, setId] = useState<string | null>(null);
  let query = useQuery();

  useEffect(() => {
    const searchId = query.get("id");
    if (searchId) {
      setId(searchId);
    } else {
      setId(null);
    }

    console.log("od url", searchId);
    console.log("id", id);
  }, [id, query, search]);

  return (
    <Box>
      <Header />

      <Grid
        templateColumns={`200px ${id ? "445px 1fr" : "1fr"}`}
        gap={2}
        background="#323542"
        height="calc(100vh - 4rem)"
      >
        <GridItem>
          <NavigationBar />
        </GridItem>
        <GridItem background="#2D2F3C" transition={"all 10s"}>
          <Routes>
            <Route path="/" element={<Navigate replace to="/inbox" />} />
            <Route path={routes.INBOX} element={<Inbox />} />
            <Route path={routes.IMPORTANT} element={<Inbox />} />
            <Route path={routes.SENT_MAIL} element={<Inbox />} />
            <Route path={routes.DRAFTS} element={<Inbox />} />
            <Route path={routes.SPAM} element={<Inbox />} />
          </Routes>
        </GridItem>
        {id && (
          <GridItem>
            <ScaleFade initialScale={0.9} in={!!id}>
              <EmailView />
            </ScaleFade>
          </GridItem>
        )}
      </Grid>
    </Box>
  );
}

export default App;
