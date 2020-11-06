import { Action, Dispatch, OfflineState } from 'app';

enum Actions {
  SetOffline = 'SetOffline',
}

const initialState: OfflineState = {
  isOffline: false,
};

export const setOfflineStatus = (status: boolean) => (dispatch: Dispatch) => {
  dispatch({ type: Actions.SetOffline, payload: status });
};

export const addListeners = () => (dispatch: Dispatch) => {
  window.addEventListener('online', (ev: Event) => dispatch(handleConnectionChange()));
  window.addEventListener('offline', (ev: Event) => dispatch(handleConnectionChange()));
};

export const removeListeners = () => (dispatch: Dispatch) => {
  window.removeEventListener('online', (ev: Event) => dispatch(handleConnectionChange()));
  window.removeEventListener('offline', (ev: Event) => dispatch(handleConnectionChange()));
};

// https://www.codementor.io/@nedson/a-guide-to-handling-internet-disconnection-in-react-applications-rs7u9zpwn
export const handleConnectionChange = () => (dispatch: Dispatch) => {
  const condition = navigator.onLine ? 'online' : 'offline';
  console.log(`handle connection change called. Connection is ${condition}`);

  if (condition === 'online') {
    const webPing = setInterval(() => {
      fetch('//google.com', {
        mode: 'no-cors',
      })
        .then(() => {
          dispatch({ type: Actions.SetOffline, payload: false });
          return clearInterval(webPing);
        })
        .catch(() => dispatch({ type: Actions.SetOffline, payload: true }));
    }, 2000);
    return;
  }

  dispatch({ type: Actions.SetOffline, payload: true });
};

const offlineReducer = (state: OfflineState = initialState, action: Action): OfflineState => {
  switch (action.type) {
    case Actions.SetOffline:
      return { isOffline: action.payload };
    default:
      return state;
  }
};

export default offlineReducer;
