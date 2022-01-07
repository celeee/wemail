import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { RootState } from "../../store/index";
import { setCredentials, loggedOut } from "../../store/auth/authSlice";
import { ALLOWED_NUMBER_OF_REAUTH } from "../../constants";

interface AuthResponse<T = any> {
  data?: T;
  request?: any;
}

const baseQuery = fetchBaseQuery({
  baseUrl: "https://firestore.googleapis.com/v1/",
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 403)
  ) {
    // try to get a new token
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user.numberOfReAuthCall > ALLOWED_NUMBER_OF_REAUTH) {
      // logged out
      // numberofreauthcall to 0
      // localstorage update
      console.log("loggout and update state");
      api.dispatch(loggedOut());
      localStorage.removeItem("user");
    } else {
      const refreshResult: AuthResponse = await baseQuery(
        {
          url: "https://securetoken.googleapis.com/v1/token?key=AIzaSyBfJZOaysPmzMSBDpS_SJDa_WhHNZp4xgw",
          method: "POST",
          body: {
            refreshToken: user.refreshToken,
            grant_type: "refresh_token",
          },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const credentials = {
          refreshToken: refreshResult.data.refresh_token,
          token: refreshResult.data.id_token,
          expTime: new Date(
            new Date().getTime() + refreshResult.data.expires_in * 1000
          ).getTime(),
        };

        // store the new token
        api.dispatch(setCredentials(credentials));

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...credentials,
            numberOfReAuthCall: user.numberOfReAuthCall + 1,
          })
        );
        // retry the initial query
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(loggedOut());
        localStorage.removeItem("user");
      }
    }
  }
  return result;
};
