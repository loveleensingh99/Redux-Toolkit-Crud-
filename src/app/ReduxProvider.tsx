"use client"

import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";

interface TReduxProvider {
  children: any;
}
const ReduxProvider: React.FC<TReduxProvider> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
