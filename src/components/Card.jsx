/* eslint-disable react/prop-types */
import arrow from "../assets/images/arrow.png";

const Card = ({ children, title, onArrowClick, removeHeader, className }) => {
  return (
    <div className={`card ${className}`}>
      {removeHeader || (
        <div className="card-header">
          <span className="card-title">{title}</span>
          <div className="card-action" onClick={onArrowClick}>
              <img src={arrow} alt="arrowIcon" />
          </div>
        </div>
      )}
      <div className="card-content">{children}</div>
    </div>
  );
};

export default Card;
