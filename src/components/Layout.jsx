import { useEffect, useState } from "react";
import moment from "moment";
import data from "../assets/data.json";
import "../App.css";
import RidingBehaviour from "./RidingBehaviour";
import CardDetails from "./CardDetails";
import {
  averageSpeed,
  distanceTravelled,
  fuelConsumed,
  fuelCost,
  timeDuration,
  topSpeed,
} from "../utils";

import {
  Distance,
  Time,
  AvSpeed,
  TopSpeed,
  FuelConsumed,
  FuelCost,
} from "../assets/index.js";
import Header from "./Header.jsx";
import DateRange from "./DateRange.jsx";

function Layout() {
  const [dateRange, setDateRange] = useState({
    title: "Today",
    label: moment().startOf("days").format("dddd, MMM DD"),
    range: [moment().startOf("days"), moment().endOf("days")],
  });
  const [filteredData, setFilteredData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // const [popupContent, setPopupContent] = useState(null);

  useEffect(() => {
    let start = moment(dateRange?.range?.[0]);
    let end = moment(dateRange?.range?.[1]);

    let filteredData = filterData(start, end, data);
    setFilteredData(filteredData);
  }, [dateRange]);

  const filterData = (start, end, data) => {
    return data.filter(
      (d) =>
        moment(d.startDate).isAfter(start) && moment(d.startDate).isBefore(end)
    );
  };

  const togglePopup = () => {
    // setPopupContent(content);
    setIsPopupOpen(!isPopupOpen);
  };

  return isPopupOpen ? (
    <DateRange
      value={dateRange}
      setValue={setDateRange}
      // content={popupContent}
      handleClose={() => setIsPopupOpen(false)}
    />
  ) : (
    <>
      <Header
        value={dateRange}
        setValue={setDateRange}
        togglePopup={(content) => togglePopup(content)}
      />
      <div className="main-container">
        <RidingBehaviour data={filteredData} />
        <CardDetails
          title="Journey"
          data={filteredData}
          fun1={distanceTravelled}
          fun2={timeDuration}
          label1={"Distanced Traveled"}
          label2={"Time Duration"}
          icon1={Distance}
          icon2={Time}
        />
        <CardDetails
          title="Speed"
          data={filteredData}
          fun1={averageSpeed}
          fun2={topSpeed}
          label1={"Average Speed"}
          label2={"Top Speed"}
          icon1={AvSpeed}
          icon2={TopSpeed}
        />
        <CardDetails
          title="Fuel"
          data={filteredData}
          fun1={fuelConsumed}
          fun2={fuelCost}
          label1={"Fuel Consumed"}
          label2={"Fuel Cost"}
          icon1={FuelConsumed}
          icon2={FuelCost}
        />
      </div>
    </>
  );
}

export default Layout;
