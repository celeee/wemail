import { Grid, GridItem, ScaleFade } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import EmailView from "./components/email/EmailView";
import Header from "./components/header/Header";
import Inbox from "./components/inbox/InboxContainer";
import NavigationBar from "./components/navigation/NavigationBar";
import useQuery from "./hooks/useQuery";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NewEmail from "./components/email/NewEmail";

export default function Layout() {
  const { search, pathname } = useLocation();
  const [id, setId] = useState<string | null>(null);
  const [openCompose, setOpenCompose] = useState<boolean>(false);
  let query = useQuery();

  useEffect(() => {
    const searchId = query.get("id");
    if (searchId) {
      setId(searchId);
    } else {
      setId(null);
    }
    setOpenCompose(!!query.get("compose"));

    console.log("od url", searchId);
    console.log("id", id);
  }, [id, query, search]);

  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Header />
      <Grid
        templateColumns={`200px ${id || openCompose ? "445px 1fr" : "1fr"}`}
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
        {(id || openCompose) && (
          <GridItem>
            <ScaleFade initialScale={0.9} in={!!id || openCompose}>
              {id && <EmailView />}
              {openCompose && <NewEmail />}
            </ScaleFade>
          </GridItem>
        )}
      </Grid>
    </>
  );
}
