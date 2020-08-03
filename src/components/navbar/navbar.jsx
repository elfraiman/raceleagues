import React from 'react';
import classes from './navbar.module.scss';
import { Nav, NavItem, NavLink, NavbarBrand, Navbar } from "shards-react";

const TopNavBar = () => {
  return (
    <Navbar type="light" expand="md">
      <NavbarBrand href="#">SPOOLRACING</NavbarBrand>
      <Nav justified>
        <NavItem>
          <NavLink active href="#" className={classes.navLink}>
            Home
        </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" className={classes.navLink}>Rules</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" className={classes.navLink}>Leagues</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" className={classes.navLink} disabled>Forum</NavLink>
        </NavItem>
        <NavItem>
          <NavLink disabled href="#">
            Discord
        </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

export default TopNavBar;