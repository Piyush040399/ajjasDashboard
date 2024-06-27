const totalDistance = (arr) => {
  return arr.reduce((acc, curr) => {
    if (!isNaN(curr.distance)) {
      return acc + curr.distance;
    }
    return acc;
  }, 0);
};

const totalTime = (arr) => {
  return arr.reduce((acc, curr) => {
    if (!isNaN(curr.duration)) {
      return acc + curr.duration;
    }
    return acc;
  }, 0);
};

const createSpeedTextBymps = (sp) => {
  let as = Math.round((sp * 18) / 5);

  return (
    <div className="detail-digit">
      {as} <span>km/hr</span>
    </div>
  );
};

const calculateFuel = (arr) => {
  let td = totalDistance(arr);

  return Math.round(td / 30000 * 100) / 100;
};

export const distanceTravelled = (arr) => {
  let temp = totalDistance(arr);

  temp = Math.round(temp / 1000 * 100) / 100;

  return (
    <div className="detail-digit">
      {temp} <span>km</span>
    </div>
  );
};

export const timeDuration = (arr) => {
  let temp = totalTime(arr);

  let tempMin = temp / 60;

  let tempHour = Math.floor(tempMin / 60);

  tempMin -= tempHour * 60;

  tempMin = Math.round(tempMin);

  return (
    <div className="detail-digit">
      {tempHour}
      <span>hr</span> {tempMin} <span>min</span>
    </div>
  );
};

export const averageSpeed = (arr) => {
  let td = totalDistance(arr);
  let tt = totalTime(arr);

  let result = (td / tt);

  return createSpeedTextBymps(isNaN(result) ? 0 : result);
};

export const topSpeed = (arr) => {
  let temp = arr.reduce((acc, curr) => {
    if (!isNaN(curr.topSpeed) && curr.topSpeed > acc) {
      return curr.topSpeed;
    }
    return acc;
  }, 0);

  return createSpeedTextBymps(temp);
};

export const fuelConsumed = (arr) => {
  let result = calculateFuel(arr);

  return (
    <div className="detail-digit">
      {result}
      <span>L</span>
    </div>
  );
};

export const fuelCost = (arr) => {
  let result = Math.round(calculateFuel(arr) * 108);

  return (
    <div className="detail-digit">
      <span>₹</span>
      {result}
    </div>
  );
};
