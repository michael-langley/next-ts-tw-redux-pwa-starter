import React, { createContext } from 'react';
import { Action, Dispatch } from 'app';
import { GeolocationContext, OfflineContext } from '.';

type ContextProps<T, F> = T & F;

type Reducer<T> = (state: T, action: Action) => T;

export interface ProviderProps {
  children: React.ReactNode;
}

interface Actions<T> {
  [key: string]: (dispatch: Dispatch, getState: () => T) => Function;
}

type BoundActions<F> = F;

function createDataContext<T, F>(reducer: Reducer<T>, actions: Actions<T>, defaultValue: T) {
  const Context = createContext<ContextProps<T, F>>({} as ContextProps<T, F>);
  const Provider = ({ children }: ProviderProps) => {
    const [state, dispatch] = React.useReducer(reducer, defaultValue);
    const offlineContext = React.useContext(OfflineContext);
    const geolocationContext = React.useContext(GeolocationContext);

    const getState = () => ({ ...state, ...offlineContext, ...geolocationContext });
    const boundActions: BoundActions<F> = {} as F;
    for (const key in actions) {
      boundActions[key] = actions[key](dispatch, getState);
    }

    return <Context.Provider value={{ ...state, ...boundActions }}>{children}</Context.Provider>;
  };

  return { Context, Provider };
}

export default createDataContext;
