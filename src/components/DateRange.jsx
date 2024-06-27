/* eslint-disable react/prop-types */
import "./DateRange.css";
import cancel from "../assets/images/cross.png";
import checked from "../assets/images/checked.png";
import { useEffect, useState } from "react";
import moment from "moment";

const DateRange = ({ handleClose, value, setValue }) => {
  const [selection, setSelection] = useState();
  const [toggle, setToggle] = useState(0);
  const [options, setOptions] = useState([]);

  const [customInput, setCustomInput] = useState({
    title: "Custom",
    label: `${moment().startOf("days").format("MMM DD YYYY")} - ${moment()
      .endOf("days")
      .format("MMM DD YYYY")}`,
    range: [moment().startOf("days"), moment().endOf("days")],
  });

  const handleToggle = (id) => {
    setToggle(id);
  };

  const tabs = ["Day", "Week", "Month", "Other"];

  useEffect(() => {
    setSelection(value);
  }, [value]);

  useEffect(() => {
    setOptions(createOptions(toggle, selection));
  }, [toggle, selection]);

  useEffect(() => {
    if (selection?.title === "Custom") {
      setSelection({ ...customInput });
    }
  }, [customInput]);

  const getDayOptions = () => {
    const formatter = "dddd, MMM DD";
    let today = moment();
    let todayStart = moment(today.startOf("day"));
    let todayEnd = moment(today.endOf("day"));

    let yesterday = moment().subtract(1, "days");
    let yesterdayStart = moment(yesterday.startOf("day"));
    let yesterdayEnd = moment(yesterday.endOf("day"));

    let dbYesterday = moment().subtract(2, "days");
    let dbYesterdayStart = moment(dbYesterday.startOf("day"));
    let dbYesterdayEnd = moment(dbYesterday.endOf("day"));
    return [
      {
        title: "Today",
        label: todayStart.format(formatter),
        range: [todayStart, todayEnd],
      },
      {
        title: "Yesterday",
        label: yesterdayStart.format(formatter),
        range: [yesterdayStart, yesterdayEnd],
      },
      {
        title: "Day Before Yesterday",
        label: dbYesterdayStart.format(formatter),
        range: [dbYesterdayStart, dbYesterdayEnd],
      },
    ];
  };
  const getWeekOptions = () => {
    const formatter = "MMM DD";

    let today = moment();
    let weekStart = moment(today.startOf("week"));
    let weekEnd = moment(today.endOf("week"));

    let lastWeek = moment().subtract(1, "weeks");
    let lastWeekStart = moment(lastWeek.startOf("week"));
    let lastWeekEnd = moment(lastWeek.endOf("week"));

    today = moment();
    let last7DayEnd = moment(today.endOf("days"));
    let last7DayStart = moment(today.subtract(6, "days").startOf("day"));

    return [
      {
        title: "This Week",
        label: `${weekStart.format(formatter)} - ${weekEnd.format(formatter)}`,
        range: [weekStart, weekEnd],
      },
      {
        title: "Last week",
        label: `${lastWeekStart.format(formatter)} - ${lastWeekEnd.format(
          formatter
        )}`,
        range: [lastWeekStart, lastWeekEnd],
      },
      {
        title: "Last 7 days",
        label: `${last7DayStart.format(formatter)} - ${last7DayEnd.format(
          formatter
        )}`,
        range: [last7DayStart, last7DayEnd],
      },
    ];
  };
  const getMonthOptions = () => {
    const formatter = "MMM DD";

    let today = moment();
    let monthStart = moment(today.startOf("month"));
    let monthEnd = moment(today.endOf("month"));

    let lastMonth = moment().subtract(1, "months");
    let lastMonthStart = moment(lastMonth.startOf("month"));
    let lastMonthEnd = moment(lastMonth.endOf("month"));

    today = moment();
    let last30DayEnd = moment(today.endOf("days"));
    let last30DayStart = moment(today.subtract(29, "days").startOf("day"));

    return [
      {
        title: "This month",
        label: `${monthStart.format(formatter)} - ${monthEnd.format(
          formatter
        )}`,
        range: [monthStart, monthEnd],
      },
      {
        title: "Last month",
        label: `${lastMonthStart.format(formatter)} - ${lastMonthEnd.format(
          formatter
        )}`,
        range: [lastMonthStart, lastMonthEnd],
      },
      {
        title: "Last 30 days",
        label: `${last30DayEnd.format(formatter)} - ${last30DayStart.format(
          formatter
        )}`,
        range: [last30DayEnd, last30DayStart],
      },
    ];
  };
  const getYearOptions = () => {
    const formatter = "MMM DD YYYY";

    let today = moment();
    let yearStart = moment(today.startOf("year"));
    let yearEnd = moment(today.endOf("year"));

    let lastyear = moment().subtract(1, "years");
    let lastyearStart = moment(lastyear.startOf("year"));
    let lastyearhEnd = moment(lastyear.endOf("year"));

    today = moment();
    let lifetimeDayEnd = moment(today.endOf("days"));
    let lifetimeDayStart = moment(today.subtract(2, "years").startOf("year"));

    return [
      {
        title: "This year",
        label: `${yearStart.format("MMM DD")} - ${yearEnd.format("MMM DD")}`,
        range: [yearStart, yearEnd],
      },
      {
        title: "Previous year",
        label: `${lastyearStart.format(formatter)} - ${lastyearhEnd.format(
          formatter
        )}`,
        range: [lastyearStart, lastyearhEnd],
      },
      {
        title: "Lifetime",
        label: `${lifetimeDayEnd.format(formatter)} - ${lifetimeDayStart.format(
          formatter
        )}`,
        range: [lifetimeDayEnd, lifetimeDayStart],
      },
    ];
  };

  const createOptions = (toggle, selectedValue) => {
    let data = [];

    switch (toggle) {
      case 0:
        data = getDayOptions();
        break;
      case 1:
        data = getWeekOptions();
        break;
      case 2:
        data = getMonthOptions();
        break;
      case 3:
        data = getYearOptions();
        break;
    }

    return data.map((d) => (
      <div
        key={d.title}
        className={`range-option ${
          selectedValue?.title === d.title ? "active" : ""
        }`}
        onClick={() => setSelection(d)}
      >
        <div className="date-title">
          <div className="title">{d.title}</div>
          <div className="label">{d.label}</div>
        </div>
        {selectedValue?.title === d.title && (
          <div className="selected">
            <img src={checked} alt={d.title} style={{ marginTop: "10px" }} />
          </div>
        )}
      </div>
    ));
  };

  const handleCustomInput = (index, value) => {
    const formatter = "MMM DD YYYY";

    let range = [...customInput.range];
    range[index] = moment(value);
    setCustomInput({
      ...customInput,
      label: `${range[0].format(formatter)} - ${range[1].format(formatter)}`,
      range: range,
    });
  };

  return (
    <div className="date-container">
      <div className="date-header">
        <div>
          <img src={cancel} alt="cancel" onClick={handleClose} />
          <span>Date range</span>
        </div>
        <button className="save-btn" onClick={() => setValue(selection)}>
          Save
        </button>
      </div>
      <div className="options">
        {tabs.map((item, i) => (
          <p
            key={i}
            className={`option ${toggle == i ? "selected-option" : ""} `}
            onClick={() => handleToggle(i)}
          >
            {item}
          </p>
        ))}
      </div>
      <div className="date-select">
        {options}

        {toggle === 3 && (
          <div
            className={`custom-date ${
              selection?.title === "Custom" ? "active" : ""
            }`}
            onClick={() => setSelection(customInput)}
          >
            <div className="date-title">
              <div className="title">{customInput?.title}</div>
            </div>
            <div className="custom-input-data">
              <div className="custom-input">
                <label className="input-label">Start date</label>
                <input
                  type="date"
                  className="input-tab"
                  value={customInput?.range?.[0].format("yyyy-MM-DD")}
                  onChange={(e) => handleCustomInput(0, e.target.value)}
                />
              </div>

              <div className="custom-input">
                <label className="input-label">End date</label>
                <input
                  type="date"
                  className="input-tab"
                  value={customInput?.range?.[1].format("yyyy-MM-DD")}
                  onChange={(e) => handleCustomInput(1, e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateRange;
