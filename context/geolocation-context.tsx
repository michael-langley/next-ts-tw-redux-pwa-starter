import { Action, Dispatch } from 'app';
import createDataContext from './create-data-context';

enum Actions {
  SetLocation = 'SetLocation',
  SetError = 'SetError',
}

export interface GeolocationState {
  currentLocation: Position | null;
  locationError: PositionError | null;
}

const initialState: GeolocationState = {
  currentLocation: null,
  locationError: null,
};

const geolocationReducer = (state: GeolocationState, action: Action): GeolocationState => {
  switch (action.type) {
    case Actions.SetLocation:
      return { currentLocation: action.payload, locationError: null };
    case Actions.SetError:
      return { currentLocation: null, locationError: action.payload };
    default:
      return state;
  }
};

const getLocationSuccess = (dispatch: Dispatch) => (position: Position) => {
  dispatch({ type: Actions.SetLocation, payload: position });
};

const getLocationError = (dispatch: Dispatch) => (positionError: PositionError) => {
  dispatch({ type: Actions.SetError, payload: positionError });
};

const getCurrentLocation = (dispatch: Dispatch) => () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position: Position) => getLocationSuccess(dispatch)(position),
      (error: PositionError) => getLocationError(dispatch)(error),
    );
  }
};

interface Fns {
  getCurrentLocation: () => Promise<void>;
}

export const { Provider, Context } = createDataContext<GeolocationState, Fns>(
  geolocationReducer,
  {
    getCurrentLocation,
  },
  initialState,
);
