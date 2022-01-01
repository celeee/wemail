import { List, ListItem } from '@chakra-ui/react';
import InboxCard from './InboxCard';

import { IEmail } from './InboxContainer';

interface IProps {
  emails: IEmail[] | null;
}

const Inbox = ({ emails }: IProps): JSX.Element => {
  return (
    <List overflowY="auto" height="calc(100vh - 4rem)" overflowX={'hidden'}>
      {emails?.map(email => (
        <ListItem
          key={email.id}
          maxW={'445px'}
          borderTop="2px solid #272A35"
          _first={{ borderTop: '0' }}
          cursor={'pointer'}
          _hover={{
            transformOrigin: 'left',
            transform: 'scale(1.02)',
          }}
        >
          <InboxCard />
        </ListItem>
      ))}
    </List>
  );
};

export default Inbox;
