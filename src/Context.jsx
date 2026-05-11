import { createContext, useState, useEffect } from "react";
import { fetchData } from "./dataHandeler/dataHandeler";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [poemData, setPoemData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    setIsLoading(true);
    fetchData(setPoemData);
    console.log("fetching data");
    setIsLoading(false);
  }, []);

  return (
    <Context.Provider value={{ poemData, isLoading }}>
      {children}
    </Context.Provider>
  );
};