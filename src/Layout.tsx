import { Grid, GridItem, ScaleFade } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import EmailView from "./components/email/EmailView";
import Header from "./components/header/Header";
import Inbox from "./components/inbox/InboxContainer";
import NavigationBar from "./components/navigation/NavigationBar";
import useQuery from "./hooks/useQuery";

export default function Layout() {
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
    <>
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
        <GridItem background="#2D2F3C">
          <Inbox />
        </GridItem>
        {id && (
          <GridItem>
            <ScaleFade initialScale={0.9} in={!!id}>
              <EmailView />
            </ScaleFade>
          </GridItem>
        )}
      </Grid>
    </>
  );
}
