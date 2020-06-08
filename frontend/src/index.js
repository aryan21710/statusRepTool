import React from "react";
import ReactDOM from "react-dom";
import Approutes  from "./routers/Approutes";
import 'normalize.css/normalize.css';
import "./styles/index.scss";
// import "../styles/react-table.css"
import { Provider } from "react-redux";
import store from './redux/store/store'




const jsx = (
  <Provider store={store}>
    <Approutes />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));
