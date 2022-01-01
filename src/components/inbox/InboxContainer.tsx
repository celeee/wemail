import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Inbox from './Inbox';

export interface IEmail {
  id: number;
  subject: string;
  isImportant?: boolean;
  body: string;
  timestamp: Date;
  viewedAt?: Date;
  type: 'sent' | 'received' | 'draft';
}

const InboxContainer = () => {
  const { pathname } = useLocation();
  const [emails, setEmails] = useState<IEmail[] | null>([
    {
      id: 1,
      subject: 'My subject',
      isImportant: true,
      body: 'This is my email, it is super long so that we are focued to cut it short',
      timestamp: new Date(),
      type: 'sent',
    },
    {
      id: 2,
      subject: 'My subject',
      viewedAt: new Date(),
      body: 'This is my email, it is super long so that we are focued to cut it short',
      timestamp: new Date(),
      type: 'received',
    },
    {
      id: 3,
      subject: 'My subject',
      viewedAt: new Date(),
      body: 'This is my email, it is super long so that we are focued to cut it short',
      timestamp: new Date(),
      type: 'draft',
    },
  ]);

  useEffect(() => {
    // fetch emails by pathname
    console.log(pathname);
  });

  return <Inbox emails={emails} />;
};

export default InboxContainer;
