import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export interface LoginUserResponse {
  displayName: string;
  email: string;
  expiresIn: string;
  idToken: string;
  kind: string;
  localId: string;
  refreshToken: string;
  registered: boolean;
}

export interface SignUpUserResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

export interface LoginSignUpRequest {
  email: string;
  password: string;
}

export const firebiseAuthApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://identitytoolkit.googleapis.com/v1/accounts",
    // prepareHeaders: (headers, { getState }) => {
    //   // By default, if we have a token in the store, let's use that for authenticated requests
    //   const token = (getState() as RootState).auth.token;
    //   if (token) {
    //     headers.set("authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  endpoints: builder => ({
    login: builder.mutation<LoginUserResponse, LoginSignUpRequest>({
      query: credentials => ({
        url: ":signInWithPassword?key=AIzaSyBfJZOaysPmzMSBDpS_SJDa_WhHNZp4xgw",
        method: "POST",
        body: credentials,
      }),
    }),

    signup: builder.mutation<SignUpUserResponse, LoginSignUpRequest>({
      query: credentials => ({
        url: ":signUp?key=AIzaSyBfJZOaysPmzMSBDpS_SJDa_WhHNZp4xgw",
        method: "POST",
        body: credentials,
      }),
    }),

    protected: builder.mutation<{ message: string }, void>({
      query: () => "protected",
    }),
  }),
});

export const { useLoginMutation, useProtectedMutation, useSignupMutation } =
  firebiseAuthApi;
