import { isEmpty } from "lodash";
import React, { useContext, useState } from "react";
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "shards-react";

import UserProvider, { UserContext } from "../../providers/userProvider";
import classes from "./navbar.module.scss";

const InnerTopNavBar = () => {
  const [dropDownState, setDropdown] = useState(false);
  const [profileDropDownState, setProfileDropDown] = useState(false);
  const userProvider = useContext(UserContext);

  const toggleDropDown = () => {
    setDropdown(!dropDownState);
  };

  const toggleProfileDropDown = () => {
    setProfileDropDown(!profileDropDownState);
  }

  const logout = () => {
    userProvider.logout();
  }

  const loginWithFb = () => {
    userProvider.loginWithFb();
  }
  return (
    <Navbar type="light" expand="md" sticky="top" className={classes.main}>
      <NavbarBrand href="#">
        <span className={classes.brand}>SPOOLRACING.</span>
      </NavbarBrand>
      <Nav justified>
        <NavItem>
          <NavLink active href="/" className={classes.navLink}>
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" className={classes.navLink}>
            Rules
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" className={classes.navLink}>
            Events
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" className={classes.navLink}>
            Team
          </NavLink>
        </NavItem>
        <Dropdown open={dropDownState} toggle={toggleDropDown}>
          <DropdownToggle nav caret theme="success">
            Tools
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Fuel Calculator</DropdownItem>
            <DropdownItem>Discord</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Nav>

      {!isEmpty(userProvider.user) ? (
           <Dropdown open={profileDropDownState} toggle={toggleProfileDropDown}>
        <DropdownToggle nav>
            <div className={classes.user}>
              <img src={userProvider.user.photoURL} alt="your profile" />
              {userProvider.user.displayName}
            </div>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={logout}>Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      ) : (
      <div className={classes.user} onClick={loginWithFb}>
        Log in
      </div> )}
   
    </Navbar>
  );
};

const TopNavBar = () => {
  return (
    <UserProvider>
      <InnerTopNavBar />
    </UserProvider>
  );
};

export default TopNavBar;
