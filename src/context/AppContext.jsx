import React, { useState, useEffect } from "react";
import data from "../assets/data.js";
const Context = React.createContext();

function ContextProvider({ children }) {
  const [PPanel, setPPanel] = useState([]);
  const [recap, setRecap] = useState(false);
  const [Currentcredit, setCredit] = useState(100);
  const [store, setStore] = useState(data);

  function UpdateStore(id, rest) {
    const newItem = data.filter((item) => item.id === id)[0];
    newItem.qty = rest;
    setStore((prevItems) => prevItems.filter((item) => item.id !== id));
    setStore((prevItems) => [...prevItems, newItem]);
  }

  function addToPPanel(newItem) {
    setPPanel((prevItems) => [...prevItems, newItem]);
  }

  function removeFromPPanel(id) {
    const item = PPanel.filter((i) => i.id === id);
    if (
      item[0].item.is_gift &&
      item[0].label === "included in the gift credit"
    ) {
      if (Currentcredit + item[0].item.gift_price * item[0].Qty > 100) {
        setCredit(100);
      } else {
        setCredit((prev) => prev + item[0].item.gift_price * item[0].Qty);
      }
    }
    setPPanel((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  return (
    <Context.Provider
      value={{
        PPanel,
        addToPPanel,
        removeFromPPanel,
        setRecap,
        recap,
        Currentcredit,
        setCredit,
        UpdateStore,
        store,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
