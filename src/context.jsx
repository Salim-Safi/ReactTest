import { createContext, useReducer } from "react";

const initialState = {
  theme: "light",
  user: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "switchTheme":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    case "setUser":
      return { ...state, user: action.payload };
    case "logout":
      return { ...state, user: action.payload };
    default:
      throw Error("unknow action in context reducer");
  }
};

const Context = createContext({ context: initialState, dispatch: () => {} });

const ContextProvider = ({ children }) => {
  const [context, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ context, dispatch }}>
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
