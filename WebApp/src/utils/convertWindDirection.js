// Convert wind degrees to wind direction
const cardinalDirection = {
  // 360 degrees is max
  N: [348.75, 11.25],
  NNE: [11.25, 33.75],
  NE: [33.75, 56.25],
  ENE: [56.25, 78.75],
  E: [78.75, 101.25],
  ESE: [101.25, 123.75],
  SE: [123.75, 146.25],
  SSE: [146.25, 168.75],
  S: [168.75, 191.25],
  SSW: [191.25, 213.75],
  SW: [213.75, 236.25],
  WSW: [236.25, 258.75],
  W: [258.75, 281.25],
  WNW: [281.25, 303.75],
  NW: [303.75, 326.25],
  NNW: [326.25, 348.75]
};

// Create iterator
cardinalDirection[Symbol.iterator] = function () {
  let properties = Object.keys(this),
    count = 0,
    isDone = false;

  let next = () => {
    if (count >= properties.length) isDone = true;
    return { value: this[properties[count++]], done: isDone };
  };

  return { next };
};

const convertWindDirection = degrees => {
  let counter = 0;

  if (
    degrees > cardinalDirection['N'][0] ||
    degrees < cardinalDirection['N'][1]
  ) {
    return Object.keys(cardinalDirection)[counter];
  }

  for (let degree of cardinalDirection) {
    if (degrees > degree[0] && degrees < degree[1]) {
      return Object.keys(cardinalDirection)[counter];
    }

    counter += 1;
  }
};

export default convertWindDirection;
