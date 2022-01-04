import NavigationListItem from "./NavigationListItem";
import { FiMail, FiStar } from "react-icons/fi";
import { MdOutlineDrafts, MdForwardToInbox } from "react-icons/md";

import * as routes from "../../../constants/routes";

const NavigationList = (): JSX.Element => {
  return (
    <nav>
      <ul>
        <NavigationListItem label="Inbox" path={routes.INBOX} icon={FiMail} />
        <NavigationListItem
          label="Important"
          path={routes.IMPORTANT}
          icon={FiStar}
        />
        <NavigationListItem
          label="Sent Mail"
          path={routes.SENT_MAIL}
          icon={MdForwardToInbox}
        />
        <NavigationListItem
          label="Drafts"
          path={routes.DRAFTS}
          icon={MdOutlineDrafts}
        />
      </ul>
    </nav>
  );
};

export default NavigationList;
