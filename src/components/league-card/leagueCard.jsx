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

const LeagueCard = ({ header, title, body, image, license }) => {
  return (
    <Card className={classes.card}>
      <CardHeader>{header}</CardHeader>
      <CardImg className={classes.image} src={image} />
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <p>{body}</p>
      </CardBody>
      <CardFooter style={{
        color: 'white',
        backgroundColor:
          license === 'bronze' ? '#CD7F32'
            : license === 'silver'
              ? '#aaa9ad' : license === 'gold'
                ? '#FFD700' : license === 'platinum'
                  ? '#e5e4e2' : null
      }}></CardFooter>
    </Card>
  )
};

export default LeagueCard;