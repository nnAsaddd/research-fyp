import React, { createContext, useContext, useReducer } from "react";
import globalReducer from "../reducer/globalReducer";

const GlobalContext = createContext();
const initialState = {
  search: "",
  showModal: false,
};

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const handleSearch = (input) => {
    dispatch({ type: "SET_SEARCH", payload: input });
  };

  const handleShowModalTrue = () => {
    dispatch({ type: "SHOW_MODAL_True" });
  };
  const handleShowModalFalse = () => {
    dispatch({ type: "SHOW_MODAL_False" });
  };

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        handleSearch,
        handleShowModalTrue,
        handleShowModalFalse,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom Hook
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export default GlobalProvider;
