import React, { useState } from 'react';

export const AppContext = React.createContext({
  channel: null,
  setChannel: (channel:any) => {},
  thread: null,
  setThread: (thread:any) => {},
});

export const AppProvider = ({ children }:any) => {
  const [channel, setChannel] :any= useState();
  const [thread, setThread] :any= useState();

  return <AppContext.Provider value={{ channel, setChannel, thread, setThread }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => React.useContext(AppContext);
