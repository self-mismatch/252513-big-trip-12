import AbstractView from "./abstract";

export default class Filter extends AbstractView {
  constructor(filters, currentFilterType) {
    super();

    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  _createFilterItemTemplate(filter, currentFilterType) {
    const {type, name} = filter;

    return (
      `<div class="trip-filters__filter">
        <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${type === currentFilterType ? `checked` : ``}>
        <label class="trip-filters__filter-label" for="filter-${type}">${name}</label>
      </div>`
    );
  }

  _createTemplate(filterItems, currentFilterType) {
    const filterItemsTemplate = filterItems
      .map((filter) => this._createFilterItemTemplate(filter, currentFilterType))
      .join(``);

    return (
      `<form class="trip-filters" action="#" method="get">
        ${filterItemsTemplate}
  
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`
    );
  }

  _getTemplate() {
    return this._createTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }
}
