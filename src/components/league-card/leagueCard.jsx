import React from "react";
import classes from "./leaguCard.module.scss";
import { Card, CardHeader, CardImg, CardBody, CardFooter, Button } from "shards-react";
import Divider from "@material-ui/core/Divider";

const LeagueCard = ({ header, carClass, image, date, footer, type }) => {
  return (
    <Card className={classes.card}>
      <CardHeader className={classes.header}>{header}</CardHeader>
      <CardImg className={classes.image} src={image} />

      <CardBody>
        <div className={classes.cardBody}>
          <div className={classes.row}>
            <h6>Date:</h6> <span>{date}</span>
          </div>
          <Divider />
          <div className={classes.row}>
            <h6>Type:</h6> <span>{type}</span>
          </div>
          <Divider />
          <div className={classes.row}>
            <h6>Class:</h6> <span>{carClass}</span>
          </div>
        </div>
        <Divider />

        <Button className={classes.btn}>Read more &rarr;</Button>
      </CardBody>

      <CardFooter style={{ fontWeight: "700" }}>
        {footer ? footer : null}
      </CardFooter>
    </Card>
  );
};

export default LeagueCard;
