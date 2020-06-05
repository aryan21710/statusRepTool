import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import ViewReport from "./ViewReport";
import { useDispatch } from "react-redux";
import { getAllStatusAction } from "../redux/action/statusAction";



const View = () => {
    const dispatch = useDispatch();
    const userId= "5ed69dc12cbbd2f967f4ced6"

  useEffect(() => {
    dispatch(getAllStatusAction(userId));
}, []);

  const loading = useSelector(
    (state) => state.statusReducer.loading,
    shallowEqual
  );

  const data = useSelector((state) => state.statusReducer.data, shallowEqual);

  return (
    <div>
      <ViewReport data={data} />
    </div>
  );
};

export default View;
