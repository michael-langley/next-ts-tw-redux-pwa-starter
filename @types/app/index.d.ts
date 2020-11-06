declare module 'app' {
  export = App;
  export as namespace App;
}

declare namespace App {
  // Context
  type Dispatch = import('react').Dispatch<Action | Function>;

  interface Action {
    type: string;
    payload?: any;
  }

  // Next Router
  interface PageProps extends import('next').NextPageContext {
    user: User | null;
  }
}
