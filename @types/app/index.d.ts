declare module 'app' {
  export = App;
  export as namespace App;
}

declare namespace App {
  // Next Router
  interface PageProps extends import('next').NextPageContext {
    user: User | null;
  }

  interface Action {
    type: string;
    payload?: any;
  }

  export type Dispatch = React.Dispatch<Action | Function>;

  export interface AppState {
    offline: OfflineState;
  }

  export interface OfflineState {
    isOffline: boolean;
  }

  import { ThunkAction } from 'redux-thunk';
  export type ThunkReturn<RT = void> = ThunkAction<RT, AppState, null, Action>;
}
