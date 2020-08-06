import React, {useState} from "react";
import { Button, Modal, ModalBody, ModalHeader, FormInput } from "shards-react";
import classes from './fuelCalculator.module.scss';

const FuelCalculator = ({triggerFuelCalculatorModal, fuelCalculatorModalState}) => {
  const [raceLength, setRaceLength] = useState(0);
  const [avgLapTime, setAvgLapTime] = useState(0);
  const [avgFuel, setAvgFuel] = useState(0);
  const [totalFuelResult, setTotalFuelResult] = useState(0);

  const handleRaceLength = (event) => {
    setRaceLength(event.target.value);
  };

  const handleAvgLapTime = (event) => {
    setAvgLapTime(event.target.value);
  };

  const handleAvgFuel = (event) => {
    setAvgFuel(event.target.value);
  };

  const calculate = () => {
    const totalLaps = (raceLength * 60) / (avgLapTime * 60);
    const totalFuelResult = Math.ceil((totalLaps + 1) * avgFuel);
    setTotalFuelResult(totalFuelResult);
  }

  return (
    <Modal open={fuelCalculatorModalState} toggle={triggerFuelCalculatorModal}>
      <ModalHeader>
        <React.Fragment>SpoolRacing Fuel Calculator</React.Fragment>
      </ModalHeader>
      <ModalBody className={classes.modal}>
        Calculate how much fuel you need for your Assetto Corsa Competizione
        race!
        <br />
        <b>We add 1 lap of reserve fuel, add more to your liking.</b>
        <FormInput
          className={classes.formInput}
          placeholder="Race Length in minutes (e.g 120)"
          onChange={handleRaceLength}
        />
        <FormInput
          className={classes.formInput}
          placeholder="Average lap time (e.g 1.49.5)"
          onChange={handleAvgLapTime}
        />
        <FormInput
          className={classes.formInput}
          placeholder="Fuel per lap (e.g 2.59)"
          onChange={handleAvgFuel}
        />
        <h3>{totalFuelResult ? totalFuelResult + " Total Liters of fuel (1 lap reserve) " : null}</h3>
        <Button className={classes.btn} onClick={calculate}>
          Calculate
        </Button>
        <div className={classes.buttons}></div>
      </ModalBody>
    </Modal>
  );
};

export default FuelCalculator;