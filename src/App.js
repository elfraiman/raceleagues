import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import React from "react";
import Routes from "./providers/Router/routes";
import Footer from "./components/footer/footer";
import TopNavBar from "./components/navbar/navbar";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import DoneIcon from "@material-ui/icons/DoneAllOutlined";
import ErrorIcon from "@material-ui/icons/ErrorOutline";
import WarningIcon from "@material-ui/icons/WarningOutlined";

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

const AlertTemplate = ({ style, options, message, close }) => (
  <div style={style} className="alert">
    {options.type === "info" && <WarningIcon />}
    {options.type === "success" && <DoneIcon />}
    {options.type === "error" && <ErrorIcon />}
    {message}
  </div>
);

function App() {
  return (
    <main>
      <AlertProvider template={AlertTemplate} {...options}>
        <TopNavBar />
        <Routes />
        <Footer />
      </AlertProvider>
    </main>
  );
}

export default App;
