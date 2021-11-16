import React, { createContext, useContext } from "react";
import { useBoxReducer } from "./reducers";

const AppContext = createContext();
const { Provider } = AppContext;

const AppProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useBoxReducer({
    box: [],
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useBoxContext = () => {
  return useContext(BoxContext);
};

export { AppProvider, useBoxContext };
