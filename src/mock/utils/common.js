const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomBoolean = () => {
  return Math.random() >= 0.5;
};

const getRandomElement = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

const getRandomDate = (start = new Date(), end = new Date(), days = 5) => {
  start.setDate(end.getDate() - days);
  end.setDate(end.getDate() + days);

  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export {getRandomInteger, getRandomBoolean, getRandomElement, getRandomDate};
