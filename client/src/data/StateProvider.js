import React, { createContext, useContext, useReducer } from "react";

//  Prepares the Data Layer
export const StateContext = createContext();

//  Provides the Data Layer to the App it wraps
export const StateProvider = ({reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)

//  Pulls info from Data Layer
export const useStateValue = () => useContext(StateContext)