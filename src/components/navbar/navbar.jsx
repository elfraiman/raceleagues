import { isEmpty } from "lodash";
import React, { useContext } from "react";
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from "shards-react";

import UserProvider, { UserContext } from "../../providers/Router/userProvider";
import classes from "./navbar.module.scss";

const InnerTopNavBar = () => {
  const userProvider = useContext(UserContext);

  console.log(userProvider, "user provider");
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
            Leagues
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" className={classes.navLink} disabled>
            Forum
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink disabled href="#">
            Discord
          </NavLink>
        </NavItem>
      </Nav>

      {!isEmpty(userProvider.user) ? (
        <div className={classes.user}>
          <img src={userProvider.user.photoURL} alt="your profile" />
          {userProvider.user.displayName}
        </div>
      ) : (
        <div className={classes.user}>Log in</div>
      )}
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
