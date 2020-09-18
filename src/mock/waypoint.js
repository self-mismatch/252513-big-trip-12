import {getRandomInteger, getRandomBoolean, getRandomElement, getRandomDate} from "./utils/common";

const waypointTypes = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
  `check-in`,
  `sightseeing`,
  `restaurant`,
];

const cities = [
  `Amsterdam`,
  `London`,
  `Dublin`,
  `Oslo`,
  `Berlin`,
  `New York`,
  `Tokyo`,
  `Moscow`,
  `Saint-Petersburg`,
  `Paris`,
];

const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

const offers = [
  {
    name: `uber`,
    fullName: `Order Uber`,
    price: `20`,
  },
  {
    name: `luggage`,
    fullName: `Add luggage`,
    price: `50`,
  },
  {
    name: `comfort`,
    fullName: `Switch to comfort`,
    price: `80`,
  },
  {
    name: `car`,
    fullName: `Rent a car`,
    price: `200`,
  },
  {
    name: `breakfast`,
    fullName: `Add breakfast`,
    price: `50`,
  },
  {
    name: `tickets`,
    fullName: `Book tickets`,
    price: `40`,
  },
  {
    name: `lunch`,
    fullName: `Lunch in city`,
    price: `30`,
  },
];

const generateId = () => {
  return Date.now() + parseInt(Math.random() * 10000, 10);
};

const generateDescription = () => {
  const sentencesCount = getRandomInteger(1, 5);
  let description = ``;

  for (let i = 0; i < sentencesCount; i++) {
    description += descriptions[getRandomInteger(0, descriptions.length - 1)];

    if (i !== sentencesCount) {
      description += ` `;
    }
  }

  return description;
};

const generateOffers = () => {
  const offersAmount = getRandomInteger(0, 3);
  const offersCopy = offers.slice();

  let finalOffers = [];

  for (let i = 0; i < offersAmount; i++) {
    const elementPosition = getRandomInteger(0, offersCopy.length - 1);
    finalOffers.push(offersCopy[elementPosition]);
    offersCopy.splice(elementPosition, 1);
  }

  return finalOffers;
};

export const generateWaypoint = () => {
  return {
    basePrice: getRandomInteger(200, 1500),
    dateFrom: getRandomDate(),
    dateTo: getRandomDate(),
    destination: getRandomElement(cities),
    id: generateId(),
    info: {
      description: generateDescription(),
      photo: `http://picsum.photos/248/152?r=${Math.random()}`,
    },
    isFavourite: getRandomBoolean(),
    offers: generateOffers(),
    type: getRandomElement(waypointTypes),
  };
};
