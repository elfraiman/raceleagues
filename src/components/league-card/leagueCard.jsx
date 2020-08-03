import React from 'react';
import classes from './leaguCard.module.scss';
import {
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter
} from "shards-react";

const LeagueCard = ({ header, title, body, image, license, footer }) => {
  return (
    <Card className={classes.card}>
      <CardHeader>{header}</CardHeader>
      <CardImg className={classes.image} src={image} />
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <p>{body}</p>
      </CardBody>
      <CardFooter style={{fontWeight: "700"}}>{footer ? footer : null}</CardFooter>
    </Card>
  )
};

export default LeagueCard;