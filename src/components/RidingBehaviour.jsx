/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Card from "./Card";
import arrow from "../assets/images/down-arrow.png";

const RidingBehaviour = ({ data }) => {
  const [score, setScore] = useState(100);
  const [scoreText, setScoreText] = useState("Excellent");

  useEffect(() => {
    let a = data.reduce((acc, curr) => {
      if (!isNaN(curr.score)) {
        return acc + curr.score;
      }
      return acc;
    }, 0);

    let averageScore = Math.round(a / data.length);
    let result = isNaN(averageScore) ? 0 : averageScore;
    setScore(result);
    setScoreText(getScoreTextByScore(averageScore));
  }, [data]);

  const getScoreTextByScore = (score) => {
    if (score > 90) {
      return "Excellent";
    } else if (score > 70) {
      return "Good";
    } else if (score > 40) {
      return "Average";
    } else {
      return "Poor";
    }
  };

  return (
    <Card title="Riding Behaviour">
      <Card removeHeader={true} className="inner-card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            className={`score-tab  ${
              scoreText == "Average"
                ? "custom-average"
                : scoreText == "Poor"
                ? "custom-poor"
                : ""
            } `}
          >
            <span
              className={`score  ${
                scoreText == "Average"
                  ? "average-score"
                  : scoreText == "Poor"
                  ? "poor-score"
                  : ""
              } `}
            >
              {score}%
            </span>
            <span className="score-text">{scoreText}</span>
          </div>
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
      </Card>
    </Card>
  );
};

export default RidingBehaviour;
