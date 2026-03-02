import { createContext, useState } from "react";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);

  return (
    <DataContext.Provider
      value={{
        transactions,
        setTransactions,
        summary,
        setSummary,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}