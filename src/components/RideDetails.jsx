/* eslint-disable react/prop-types */
import "./RideDetails.css";
import arrow from "../assets/images/down-arrow.png";

const RideDetails = ({ label, value, icon }) => {
  return (
    <div className="detail-container">
      <div className="detail-header">
        <img
          src={icon}
          alt="travelled distance"
          style={{ width: "18px", height: "18px" }}
        />
        <span className="container-heading">{label}</span>
      </div>
      <div className="digit-container">{value}</div>
      <div className="text-container">
        <img src={arrow} alt="arrow" />
        <span
          style={{
            fontSize: "8px",
            fontWeight: "400",
            lineHeight: "0.64px",
            color: "#D24343",
            marginTop: "5px",
          }}
        >
          24%
        </span>
        <span className="detail-text">
          vs <span style={{ fontWeight: "700" }}>preceding period</span>
        </span>
      </div>
    </div>
  );
};

export default RideDetails;
