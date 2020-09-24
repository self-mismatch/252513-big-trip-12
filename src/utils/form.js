const validatePointDestination = (description, datalist) => {
  let isDestinationValid = false;

  const options = datalist.options;

  for (const option of options) {
    if (description === option.value) {
      isDestinationValid = true;
      break;
    }
  }

  return isDestinationValid;
};

export {validatePointDestination};
