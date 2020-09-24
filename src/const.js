const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  BEFOREELEMENT: `beforeelement`,
};

const SortType = {
  DEFAULT: `default`,
  DURATION_DOWN: `duration-down`,
  PRICE_DOWN: `price-down`,
};

const UserAction = {
  UPDATE_POINT: `UPDATE_POINT`,
  ADD_POINT: `ADD_POINT`,
  DELETE_POINT: `DELETE_POINT`,
};

const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
};

export {FilterType, RenderPosition, SortType, UserAction, UpdateType};
