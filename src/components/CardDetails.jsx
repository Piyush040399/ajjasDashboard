/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Card from "./Card";
import RideDetails from "./RideDetails";

const CardDetails = ({ title, data, fun1, fun2, label1, label2, icon1, icon2 }) => {
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);

  useEffect(() => {
    setData1(fun1(data));
    setData2(fun2(data));
  }, [data]);

  return (
    <Card title={title}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <RideDetails label={label1} value={data1}  icon={icon1} />
        <RideDetails label={label2} value={data2}  icon={icon2} />
      </div>
    </Card>
  );
};

export default CardDetails;
