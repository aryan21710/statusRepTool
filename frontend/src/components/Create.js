import React, { useEffect } from "react";
import StatusForm from "./Statusform";
import { postStatusAction } from "../redux/action/statusAction";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";


const Create = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div>
      <Header />
      <StatusForm
        onSubmit={(reports) => {
          console.log("INSIDE Create.JS PROPS:-", reports);
          dispatch(postStatusAction(reports));
          history.push("/view");
        }}
      />
    </div>
  );
};

export default React.memo(Create);
