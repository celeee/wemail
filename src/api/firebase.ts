import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./auth";
import { parse } from "../utils/firestore-parser";

export const firebaseApi = createApi({
  reducerPath: "inbox",
  baseQuery: baseQueryWithReauth,
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
                    fieldPath: type?.type ? "type" : "isImportant",
                  },
                  op: "EQUAL",
                  value: {
                    [type.type ? "stringValue" : "booleanValue"]: type.type
                      ? type.type
                      : type.isImportant,
                  },
                },
              },
            },
          },
        };
      },
      transformResponse: (response: any) => {
        return response.map((item: any) => ({
          docId: item.document.name.slice(-20),
          ...parse(item.document),
        }));
      },
    }),

    updateEmail: builder.mutation({
      query: ({ id, isImportant }) => ({
        url: `https://firestore.googleapis.com/v1/projects/photo-gallery-48933/databases/(default)/documents/emails/${id}?updateMask.fieldPaths=isImportant`,
        method: "PATCH",
        body: {
          fields: {
            isImportant: { booleanValue: isImportant },
          },
        },
      }),
    }),

    storeUser: builder.mutation({
      query: userFields => ({
        url: `projects/photo-gallery-48933/databases/(default)/documents/users`,
        method: "POST",
        body: userFields,
      }),
    }),

    getUserByUserId: builder.mutation({
      query: userId => ({
        url: `https://firestore.googleapis.com/v1/projects/photo-gallery-48933/databases/(default)/documents:runQuery`,
        method: "POST",
        body: {
          structuredQuery: {
            from: [
              {
                collectionId: "users",
              },
            ],

            where: {
              fieldFilter: {
                field: {
                  fieldPath: "userId",
                },
                op: "EQUAL",
                value: {
                  stringValue: userId,
                },
              },
            },
          },
        },
      }),
      transformResponse: (response: any) => {
        return parse(response[0].document);
        // response.map((item: any) => ({
        //   docId: item.document.name.slice(-20),
        //   ...parse(item.document),
        // }));
      },
    }),
  }),
});

export const { useGetEmailByTypeQuery, useUpdateEmailMutation } = firebaseApi;
