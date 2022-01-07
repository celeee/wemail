import { AuthState } from "../store/auth/authSlice";
import axios from "axios";

export const checkAuthTimeout = (expirationTime: number) => {
  setTimeout(() => {
    logout();
  }, expirationTime * 1000);
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const authCheckState = () => {
  const user: AuthState = JSON.parse(localStorage.getItem("user") || "{}");
  console.log("check");
  if (!user.token || !user.expTime) {
    console.log("logout");
    logout();
  } else {
    console.log("pre axios");
    // Refresh the token a minute early to avoid latency issues
    const expirationDate = user.expTime - 60000;

    if (Date.now() >= expirationDate) {
      console.log("axios");
      axios
        .post(
          "https://securetoken.googleapis.com/v1/token?key=AIzaSyBfJZOaysPmzMSBDpS_SJDa_WhHNZp4xgw",
          {
            grant_type: "refresh_token",
            refresh_token: user.refreshToken,
          }
        )
        .then(res => console.log(res))
        .catch(error => console.log(error));
      console.log("refresh token");
      // set LocalStorage here based on response;
    } else {
      console.log("znaci uste ne pomina eden sat");
      checkAuthTimeout((user.expTime - new Date().getTime()) / 1000);
    }
  }
};
