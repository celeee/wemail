import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  FetchBaseQueryError,
  QueryDefinition,
} from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./auth";
import { parse } from "../utils/firestore-parser";
import { IEmail } from "../components/inbox/InboxContainer";

export const firebaseApi = createApi({
  reducerPath: "inbox",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Email"],
  endpoints: builder => ({
    getEmailByType: builder.query({
      queryFn: async (arg: any, _queryApi, __extraOptions, baseQuery) => {
        const results = await Promise.all(
          arg.map((query: any) =>
            baseQuery({
              url: "https://firestore.googleapis.com/v1/projects/photo-gallery-48933/databases/(default)/documents:runQuery",
              method: "POST",
              body: {
                structuredQuery: {
                  from: [
                    {
                      collectionId: "emails",
                    },
                  ],

                  ...query,
                },
              },
            })
          )
        );

        const merged: any[] = []
          .concat(...results.map((result: any) => result.data))
          .filter((item: any) => item.document);

        let transformResponse: any = null;

        transformResponse = merged?.map((item: any) => ({
          docId: item?.document?.name.slice(-20),
          ...parse(item?.document),
        }));

        const errors: any[] = [].concat(
          ...results
            .filter((result: any) => result.error != null)
            .map((result: any) => result.error)
        );

        if (errors.length === 0) {
          return { data: transformResponse };
        }

        return {
          error: {
            status: 500,
            statusText: "Internal Server Error",
            data: "Coin landed on it's edge!",
          },
        };
      },
      providesTags: result =>
        result
          ? [
              ...result.map(({ docId }: { docId: number }) => ({
                type: "Email" as const,
                docId,
              })),
              { type: "Email", id: "LIST" },
            ]
          : [{ type: "Email", id: "LIST" }],
    }) as QueryDefinition<
      any,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, {}>,
      never,
      any,
      string
    >,

    getEmail: builder.query<IEmail, string>({
      query: docId =>
        `https://firestore.googleapis.com/v1/projects/photo-gallery-48933/databases/(default)/documents/emails/${docId}`,
      providesTags: (result, error, docId) => [{ type: "Email", docId }],
      transformResponse: (response: any) => {
        return parse(response[0].document);
      },
    }),

    updateEmail: builder.mutation<
      void,
      Pick<IEmail, "docId"> & Partial<IEmail>
    >({
      query: ({ docId, isImportant }) => ({
        url: `https://firestore.googleapis.com/v1/projects/photo-gallery-48933/databases/(default)/documents/emails/${docId}?updateMask.fieldPaths=isImportant`,
        method: "PATCH",
        body: {
          fields: {
            isImportant: { booleanValue: isImportant },
          },
        },
      }),
      invalidatesTags: (result, error, { docId }) => [{ type: "Email", docId }],
    }),

    storeUser: builder.mutation({
      query: userFields => ({
        url: `projects/photo-gallery-48933/databases/(default)/documents/users`,
        method: "POST",
        body: userFields,
      }),
    }),

    sendEmail: builder.mutation({
      query: email => ({
        url: `projects/photo-gallery-48933/databases/(default)/documents/emails`,
        method: "POST",
        body: email,
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

export const { useUpdateEmailMutation, useGetEmailByTypeQuery } = firebaseApi;
