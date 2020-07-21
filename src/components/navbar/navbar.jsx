import React from 'react';
import classes from './navbar.module.scss';
import { Nav, NavItem, NavLink } from "shards-react";

const Navbar = () => {

  return (
    <Nav justified>
      <NavItem>
        <NavLink active href="#" className={classes.navLink}>
          Home
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#" className={classes.navLink}>Link</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#" className={classes.navLink}>Another Link</NavLink>
      </NavItem>  
      <NavItem>
        <NavLink disabled href="#">
          Disabled Link
        </NavLink>
      </NavItem>
    </Nav>
  );
}

export default Navbar;