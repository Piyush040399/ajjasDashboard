/* eslint-disable react/prop-types */
import "./Header.css";
import left from "../assets/images/left-arrow.png";
import right from "../assets/images/right-arrow.png";
import calender from "../assets/images/calender.png";
import DateRange from "./DateRange";

const Header = ({ value, togglePopup }) => {
  return (
    <div className="header-container">
      <p className="header-text">Statistics</p>
      <div className="date-range-tab">
        <div
          className="date-range-section"
          onClick={() =>
            togglePopup(<DateRange handleClose={() => togglePopup(true)} />)
          }
        >
          <img src={calender} alt="calender icon" />
          <span className="selected-range">
            {" "}
            {value?.label} ({value?.title})
          </span>
        </div>
        <div style={{ width: "72px" }}>
          <img src={left} alt="left icon" style={{ marginRight: "50px" }} />
          <img src={right} alt="right icon" />
        </div>
      </div>
    </div>
  );
};

export default Header;
