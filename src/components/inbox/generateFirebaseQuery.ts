export function generateFirebaseQuery(pathname: any, currentUser: any) {
  switch (pathname) {
    case "inbox":
      const inboxQuery = {
        where: {
          compositeFilter: {
            filters: [
              {
                fieldFilter: {
                  field: {
                    fieldPath: "type",
                  },
                  op: "EQUAL",
                  value: {
                    stringValue: "received",
                  },
                },
              },
              {
                fieldFilter: {
                  field: {
                    fieldPath: "recipients",
                  },
                  op: "array-contains",
                  value: {
                    stringValue: currentUser.email,
                  },
                },
              },
            ],
            op: "AND",
          },
        },
      };
      return [inboxQuery];
    case "important":
      const q1 = {
        where: {
          compositeFilter: {
            filters: [
              {
                fieldFilter: {
                  field: {
                    fieldPath: "isImportant",
                  },
                  op: "EQUAL",
                  value: {
                    booleanValue: "true",
                  },
                },
              },
              {
                fieldFilter: {
                  field: {
                    fieldPath: "userId",
                  },
                  op: "EQUAL",
                  value: {
                    stringValue: currentUser.userId,
                  },
                },
              },
            ],
            op: "AND",
          },
        },
      };

      const q2 = {
        where: {
          compositeFilter: {
            filters: [
              {
                fieldFilter: {
                  field: {
                    fieldPath: "isImportant",
                  },
                  op: "EQUAL",
                  value: {
                    booleanValue: "true",
                  },
                },
              },
              {
                fieldFilter: {
                  field: {
                    fieldPath: "recipients",
                  },
                  op: "array-contains",
                  value: {
                    stringValue: currentUser.email,
                  },
                },
              },
            ],
            op: "AND",
          },
        },
      };
      return [q1, q2];
    case "drafts":
      const draftsQuery = {
        where: {
          compositeFilter: {
            filters: [
              {
                fieldFilter: {
                  field: {
                    fieldPath: "type",
                  },
                  op: "EQUAL",
                  value: {
                    stringValue: "drafts",
                  },
                },
              },
              {
                fieldFilter: {
                  field: {
                    fieldPath: "userId",
                  },
                  op: "EQUAL",
                  value: {
                    stringValue: currentUser.userId,
                  },
                },
              },
            ],
            op: "AND",
          },
        },
      };
      return [draftsQuery];
    case "sent-mail":
      const sentMailQuery = {
        where: {
          compositeFilter: {
            filters: [
              // {
              //   fieldFilter: {
              //     field: {
              //       fieldPath: "type",
              //     },
              //     op: "EQUAL",
              //     value: {
              //       stringValue: "sent-mail",
              //     },
              //   },
              // },
              {
                fieldFilter: {
                  field: {
                    fieldPath: "userId",
                  },
                  op: "EQUAL",
                  value: {
                    stringValue: currentUser.userId,
                  },
                },
              },
            ],
            op: "AND",
          },
        },
      };
      return [sentMailQuery];
  }
}
