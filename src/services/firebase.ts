import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IEmail } from "../components/inbox/InboxContainer";

export const firebaseApi = createApi({
  reducerPath: "inbox",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://firestore.googleapis.com/v1/",
  }),
  endpoints: builder => ({
    getEmailByType: builder.query({
      query: type => {
        return {
          url: "https://firestore.googleapis.com/v1/projects/photo-gallery-48933/databases/(default)/documents:runQuery",
          method: "POST",
          body: {
            structuredQuery: {
              from: [
                {
                  collectionId: "emails",
                },
              ],

              where: {
                fieldFilter: {
                  field: {
                    fieldPath: "type",
                  },
                  op: "EQUAL",
                  value: {
                    stringValue: type?.type,
                  },
                },
              },
            },
          },
        };
      },
    }),
  }),
});

export const { useGetEmailByTypeQuery } = firebaseApi;
