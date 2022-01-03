import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetEmailByTypeQuery } from "../../services/firebase";
import { parse } from "../../utils/firestore-parser";
import { Progress } from "@chakra-ui/react";
// import { useAppSelector } from "../../store/hooks";
// import axios from "axios";

// Component
import Inbox from "./Inbox";

export interface IEmail {
  docId: string;
  from: string;
  userId: string;
  subject: string;
  isImportant: boolean;
  isSpam: boolean;
  message: string;
  timestamp: Date;
  viewedAt?: Date;
  recipients: string[];
  type: "sent" | "received" | "draft";
}

enum EPathname {
  inbox = "inbox",
  important = "important",
  spam = "spam",
  drafts = "drafts",
  "sent-mail" = "sent-mail",
}

const InboxContainer: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname.slice(1) as EPathname;

  const emailsByPathName = {
    inbox: { type: "received", isSpam: false },
    important: { isImportnat: true },
    spam: { isSpam: true },
    drafts: { userId: "1", type: "drafts" },
    "sent-mail": { userId: "1", type: "sent" },
  };

  const { data, error, isLoading, isFetching } = useGetEmailByTypeQuery(
    emailsByPathName[pathname]
  );

  const [emails, setEmails] = useState<IEmail[] | null>(null);

  useEffect(() => {
    const modifiedData = data?.map((item: any) => ({
      docId: item.document.name.slice(-20),
      ...parse(item.document),
    }));
    setEmails(modifiedData);
  }, [data]);

  if (error) return <p>Something went wrong</p>;

  if (isLoading || isFetching) return <Progress size="xs" isIndeterminate />;

  return <Inbox emails={emails} />;
};

export default InboxContainer;
