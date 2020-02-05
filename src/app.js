import React from "react";
import ReactDOM from "react-dom";
import Approutes  from "./routers/Approutes";
import 'normalize.css/normalize.css';
import "../styles/styles.css";
import "../styles/react-table.css"
import { Provider } from "react-redux";
import { createStore } from "redux";


const report = {
  createdAt: "",
  category: {},
  categoryCnt: 0,
	categoryObj: {},
  category: 'Miscellaneous',

	text: '',
		data: [{
			date: '',
			category: '',
			status: '',
		}],
};
const reducer = (state = [report ], action) => {
  switch (action.type) {
    case "VIEW_REP":
      console.log("INSIDE VIEW_REP SWITCH STATEMENT");
      console.log("REPORT:-" + JSON.stringify(action.report));
      return Object.assign({}, action.report);
    // return [...state, action.report]
    default:
      return state;
  }
};

const store = createStore(
  reducer, /* preloadedState, */
  +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );

store.subscribe(() => {
  console.log("latest state change:-" + JSON.stringify(store.getState()));
});

const jsx = (
  <Provider store={store}>
    <Approutes />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));
