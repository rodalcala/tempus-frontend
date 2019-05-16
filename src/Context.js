import React from 'react';

const baseUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000';

const Context = React.createContext();

const ContextProvider = props => <Context.Provider value={baseUrl} {...props} />;

export {
  Context,
  ContextProvider
};
