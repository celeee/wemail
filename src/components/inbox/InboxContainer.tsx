import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetEmailByTypeQuery } from "../../api/firebase";

// Components
import { Progress } from "@chakra-ui/react";
import Inbox from "./Inbox";
import { useAppSelector } from "../../store/hooks";
import { selectCurrentUser } from "../../store/auth/authSlice";
import { generateFirebaseQuery } from "./generateFirebaseQuery";
import NoMessageFound from "../NoMessageFound";
import { messageTypes } from "../../constants/index";

export interface IEmail {
  docId: string;
  from: string;
  userId: string;
  subject: string;
  isImportant: boolean;
  message: string;
  timestamp: Date;
  viewedAt?: Date;
  recipients: string[];
  type: "sent" | "received" | "draft";
}

enum EPathname {
  inbox = "inbox",
  important = "important",
  drafts = "drafts",
  "sent-mail" = "sent-mail",
}

const InboxContainer = () => {
  const location = useLocation();
  const pathname = location.pathname.slice(1) as EPathname;
  const currentUser = useAppSelector(selectCurrentUser);

  const [query, setQuery] = useState<any[] | undefined>([]);

  useEffect(() => {
    if (currentUser) {
      const generatedQuery = generateFirebaseQuery(pathname, currentUser);
      setQuery(generatedQuery);
    }
  }, [currentUser, pathname]);

  const {
    data: emails,
    error,
    isLoading,
    isFetching,
  } = useGetEmailByTypeQuery(query);

  if (error) return <p>Something went wrong</p>;

  // if (isLoading) return <Progress size="xs" isIndeterminate />;

  // if (emails && emails.length === 0)
  //   return <NoMessageFound {...messageTypes[pathname]} />;

  return (
    <>
      {isFetching && <Progress size="xs" isIndeterminate />}
      {emails && emails.length === 0 && !isFetching && !isLoading && (
        <NoMessageFound {...messageTypes[pathname]} />
      )}
      <Inbox emails={emails} />
    </>
  );
};

export default React.memo(InboxContainer);
