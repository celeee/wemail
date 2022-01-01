import NavigationListItem from "./NavigationListItem";
import { FiMail, FiStar, FiAlertTriangle } from "react-icons/fi";
import { MdOutlineDrafts, MdForwardToInbox } from "react-icons/md";

const NavigationList = (): JSX.Element => {
  return (
    <nav>
      <ul>
        <NavigationListItem label="Inbox" path="/inbox" icon={FiMail} />
        <NavigationListItem label="Important" path="/important" icon={FiStar} />
        <NavigationListItem
          label="Sent Mail"
          path="/sent-mail"
          icon={MdForwardToInbox}
        />
        <NavigationListItem
          label="Drafts"
          path="/drafts"
          icon={MdOutlineDrafts}
        />
        <NavigationListItem label="Spam" path="/spam" icon={FiAlertTriangle} />
      </ul>
    </nav>
  );
};

export default NavigationList;
