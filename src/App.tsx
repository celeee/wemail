import { Routes, Route, Navigate } from "react-router-dom";

import * as routes from "./constants/routes";

// Components
import { Box } from "@chakra-ui/react";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Layout from "./Layout";
import NotFound from "./components/NotFound";
import { useEffect, useState } from "react";
import {
  selectCurrentUser,
  setCredentials,
  setCurrentUser,
  User,
} from "./store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import jwt_decode from "jwt-decode";
import { firebaseApi } from "./api/firebase";

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  // const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    (async function () {
      setLoading(true);

      const user: {
        token: string;
        refreshToken: string;
        expTime: number;
      } = JSON.parse(localStorage.getItem("user") || "{}");

      if (user.token && user.expTime && user.refreshToken) {
        const expirationTime = user.expTime - 60000;
        const decodedToken: any = jwt_decode(user.token);

        if (Date.now() <= expirationTime) {
          dispatch(setCredentials(user));
          setLoading(false);
        }

        const currentUser = await dispatch(
          firebaseApi.endpoints.getUserByUserId.initiate(decodedToken.user_id)
        ).unwrap();

        dispatch(setCurrentUser(currentUser));

        setLoading(false);
      }

      setLoading(false);
    })();
  }, [dispatch]);

  return (
    <Box>
      {!loading && (
        <Routes>
          <Route path="/" element={<Navigate replace to="/inbox" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {[
            routes.INBOX,
            routes.IMPORTANT,
            routes.SENT_MAIL,
            routes.DRAFTS,
          ].map((path, index) => {
            return <Route path={path} element={<Layout />} key={index} />;
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </Box>
  );
}

export default App;
