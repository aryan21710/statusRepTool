import React from "react";
import StatusForm from "./Statusform";
import { postStatusAction } from "../redux/action/statusAction";
import Header from "../components/Header";
import { useDispatch } from "react-redux";


const Create = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <Header />
      <StatusForm
        onSubmit={(reports) => {
          console.log("INSIDE Create.JS PROPS:-", reports);
          dispatch(postStatusAction(reports));
        }}
      />
    </div>
  );
};

export default Create;
