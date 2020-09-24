import PointView from "../view/point";
import PointEditView from "../view/point-edit";

import {render, replace, remove} from "../utils/render";
import {UpdateType, UserAction} from "../const";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`,
};

export default class Point {
  constructor(pointContainer, changeData, changeMode) {
    this._pointContainer = pointContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointComponent = null;
    this._pointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditOpenClick = this._handleEditOpenClick.bind(this);
    this._handleEditCloseClick = this._handleEditCloseClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFavouriteClick = this._handleFavouriteClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init(point) {
    this._point = point;

    this._prevPointComponent = this._pointComponent;
    this._prevPointEditComponent = this._pointEditComponent;

    this._pointComponent = new PointView(point);
    this._pointEditComponent = new PointEditView(point);

    this._pointComponent.setEditOpenClickHandler(this._handleEditOpenClick);
    this._pointEditComponent.setEditCloseClickHandler(this._handleEditCloseClick);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setFavouriteClickHandler(this._handleFavouriteClick);
    this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    if (!this._prevPointComponent || !this._prevPointEditComponent) {
      render(this._pointContainer, this._pointComponent);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, this._prevPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._pointEditComponent, this._prevPointEditComponent);
    }

    remove(this._prevPointComponent);
    remove(this._prevPointEditComponent);
  }

  destroy() {
    // remove(this._pointComponent);
    // remove(this._pointEditComponent);
    this._pointEditComponent.removeDatepicker();
  }

  resetView() {
    if (this._mode === Mode.DEFAULT) {
      return;
    }

    this._replaceFormToPoint();
  }

  _escKeyDownHandler(evt) {
    if (evt.key !== `Escape` && evt.key !== `Esc`) {
      return;
    }

    evt.preventDefault();
    this._pointEditComponent.reset(this._point);
    this._replaceFormToPoint();
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _replacePointToForm() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._pointEditComponent.setDatepicker();
    this._mode = Mode.EDITING;
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._pointEditComponent.removeDatepicker();
    this._mode = Mode.DEFAULT;
  }

  _handleEditOpenClick() {
    this._replacePointToForm();
  }

  _handleEditCloseClick() {
    this._pointEditComponent.reset(this._point);
    this._replaceFormToPoint();
  }

  _handleFormSubmit(point) {
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        point
    );
    this._replaceFormToPoint();
  }

  _handleFavouriteClick() {
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._point,
            {
              isFavourite: !this._point.isFavourite
            }
        )
    );
  }

  _handleDeleteClick(point) {
    this._changeData(
        UserAction.DELETE_POINT,
        UpdateType.MINOR,
        point
    );
  }
}
