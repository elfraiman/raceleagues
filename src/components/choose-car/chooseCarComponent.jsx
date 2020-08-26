import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, FormInput } from "shards-react";
import classes from "./fuelCalculator.module.scss";

const ChooseCarComponent = ({
  triggerModal,
  modalState,
}) => {
  return (
    <Modal open={modalState} toggle={triggerModal}>
      <ModalHeader>
        <React.Fragment>Choose your car</React.Fragment>
      </ModalHeader>
      <ModalBody className={classes.modal}>
        Make sure you're set with your car of choice, you cannot change your car for this league later on!
        <br />

        <Button className={classes.btn} onClick={calculate}>
          Select Car
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default ChooseCarComponent;
