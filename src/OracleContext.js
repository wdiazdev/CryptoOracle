import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'


const AppContext = createContext()

const OracleContext = ({ children }) => {
    const [currency, setCurrency] = useState("USD");
    const [symbol, setSymbol] = useState("$");

    useEffect(() => {
        if (currency === "USD") setSymbol("$");
        else if (currency === "EUR") setSymbol("€");
    }, [currency]);

    return (
        <AppContext.Provider value={{ currency, symbol, setCurrency }}>
            {children}
        </AppContext.Provider>
    )
}

export default OracleContext;

export const OracleContextState = () => {
    return useContext(AppContext);
};