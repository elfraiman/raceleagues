import React from "react";
import classes from "./footer.module.scss";

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.left}>
        <h3>SPOOLRACING.</h3>
      </div>

      <div className={classes.center}>
        <p>
          © SPOOLRACING - 2020 created by Elan Fraiman <br />- contact
          spoolracing@gmail.com
        </p>
      </div>

      <div className={classes.right}>
        <h3>Meet, Chat, Race.</h3>
      </div>
    </div>
  );
};

export default Footer;
