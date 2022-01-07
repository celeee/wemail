import React from "react";
import { useLocation } from "react-router-dom";
import { useGetEmailByTypeQuery } from "../../api/firebase";

// Components
import { Progress } from "@chakra-ui/react";
import Inbox from "./Inbox";
import { useAppSelector } from "../../store/hooks";
import { selectCurrentUser } from "../../store/auth/authSlice";

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

const InboxContainer: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname.slice(1) as EPathname;
  const currentUser = useAppSelector(selectCurrentUser);

  const emailsByPathName = {
    inbox: { type: "received" },
    important: { isImportant: true },
    drafts: { userId: currentUser?.userId, type: "drafts" },
    "sent-mail": { userId: currentUser?.userId, type: "sent" },
  };

  const {
    data: emails,
    error,
    isLoading,
    isFetching,
  } = useGetEmailByTypeQuery(emailsByPathName[pathname]);

  if (error) return <p>Something went wrong</p>;

  if (isLoading || isFetching) return <Progress size="xs" isIndeterminate />;

  return <Inbox emails={emails} />;
};

export default InboxContainer;
