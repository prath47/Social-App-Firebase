import { createContext } from "react";

export const FirebaseContext = createContext(null);

export const FirebaseContextProvider = ({ children }) => {
  return <FirebaseContext.Provider>{children}</FirebaseContext.Provider>;
};
