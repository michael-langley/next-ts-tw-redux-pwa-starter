import { Action, Dispatch } from 'app';
import createDataContext from './create-data-context';

enum Actions {
  SetOffline = 'SetOffline',
}

export interface OfflineState {
  isOffline: boolean;
}

const initialState: OfflineState = {
  isOffline: false,
};

const offlineReducer = (state: OfflineState, action: Action): OfflineState => {
  switch (action.type) {
    case Actions.SetOffline:
      return { isOffline: action.payload };
    default:
      return state;
  }
};

const setOfflineStatus = (dispatch: Dispatch) => (status: boolean) => {
  dispatch({ type: Actions.SetOffline, payload: status });
};

const addListeners = (dispatch: Dispatch) => () => {
  window.addEventListener('online', (ev: Event) => handleConnectionChange(dispatch)());
  window.addEventListener('offline', (ev: Event) => handleConnectionChange(dispatch)());
};

const removeListeners = (dispatch: Dispatch) => () => {
  window.removeEventListener('online', (ev: Event) => handleConnectionChange(dispatch)());
  window.removeEventListener('offline', (ev: Event) => handleConnectionChange(dispatch)());
};

// https://www.codementor.io/@nedson/a-guide-to-handling-internet-disconnection-in-react-applications-rs7u9zpwn
const handleConnectionChange = (dispatch: Dispatch, getState?: () => any) => () => {
  const condition = navigator.onLine ? 'online' : 'offline';
  console.log(`handle connection change called. Connection is ${condition}`);

  if (condition === 'online') {
    const webPing = setInterval(() => {
      fetch('//google.com', {
        mode: 'no-cors',
      })
        .then(() => {
          if (getState) {
            const { startListener } = getState();
            startListener();
          }
          dispatch({ type: Actions.SetOffline, payload: false });
          return clearInterval(webPing);
        })
        .catch(() => dispatch({ type: Actions.SetOffline, payload: true }));
    }, 2000);
    return;
  }

  dispatch({ type: Actions.SetOffline, payload: true });
};

interface Fns {
  setOfflineStatus: (status: boolean) => Promise<void>;
  addListeners: () => void;
  removeListeners: () => void;
  handleConnectionChange: () => void;
}

export const { Provider, Context } = createDataContext<OfflineState, Fns>(
  offlineReducer,
  {
    setOfflineStatus,
    addListeners,
    removeListeners,
    handleConnectionChange,
  },
  initialState,
);
