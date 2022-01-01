import React from "react";
import { Flex, Icon } from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";

const activeStyle = {
  borderLeft: "5px solid #2B89E8",
  transition: "border 250ms",
  display: "flex",
  background: "#292B3A",
  marginBottom: "10px",
};

interface IProps {
  label: string;
  path: string;
  icon?: React.FC;
}

const NavigationListItem = ({ label, path, icon }: IProps): JSX.Element => {
  const { pathname } = useLocation();
  const isRootPath = path === "/inbox" && pathname === "/";

  return (
    <li>
      <NavLink
        to={path}
        style={(navData) => (navData.isActive || isRootPath ? activeStyle : {})}
      >
        <Flex
          w="full"
          align="center"
          color="white"
          p="4"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "#292B3A",
            color: "#2F75BE",
          }}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "#2F75BE",
              }}
              as={icon}
            />
          )}
          {label}
        </Flex>
      </NavLink>
    </li>
  );
};

export default NavigationListItem;
