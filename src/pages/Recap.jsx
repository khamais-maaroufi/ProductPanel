import React from "react";
import { Context } from "../context/AppContext.jsx";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Recap = () => {
  const [NumberOfProducts, setNumberOfProducts] = useState(0);
  const [TpriceNogift, setTpriceNogift] = useState(0);
  const [TpriceWgift, setTpriceWgift] = useState(0);
  const [NumberOfEntities, setNumberOfEntities] = useState(0);
  const [date, setDate] = useState(new Date().toString());
  const [usedGiftCredit, setUsedGiftCredit] = useState(0);

  const {
    PPanel,
    addToPPanel,
    removeFromPPanel,
    setRecap,
    recap,
    Currentcredit,
    setCredit,
    UpdateStore,
    store,
  } = useContext(Context);

  useEffect(() => {
    let entities = 0;
    let tpwgift = 0;
    let tp = 0;
    if (PPanel?.length > 0) {
      let uniqueProducts = [];
      PPanel.forEach((item) => {
        if (!uniqueProducts.includes(item.item.id)) {
          uniqueProducts.push(item.item.id);
        }
        entities += Number(item.Qty);
        tp += Number(item.totalPrice);
        if (item.label === "not included in the gift credit") {
          tpwgift += Number(item.totalPrice);
        }
      });
      setNumberOfProducts(uniqueProducts.length);
      setNumberOfEntities(entities);
      setUsedGiftCredit(100 - Currentcredit);
      setTpriceWgift(tp);
      setTpriceNogift(tpwgift);
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {recap ? (
        <main className="recap-container">
          {/* here we display the recap page */}
          {PPanel?.length <= 0 ? (
            <>
              <div>You haven't add anything to the Product Panel!</div>

              <button>
                <Link to="/">Return</Link>
              </button>
            </>
          ) : (
            <>
              {" "}
              <div>
                <h4>Date: </h4>
                {date}
              </div>
              <div>
                <h4>Number Of Products: </h4>
                {NumberOfProducts}
              </div>
              <div>
                <h4>Number Of Entities: </h4>
                {NumberOfEntities}
              </div>
              <div>
                <h4>used Gift Credit:</h4>
                {usedGiftCredit}
              </div>
              <div>
                <h4>Total price without gift:</h4>
                {TpriceNogift}
              </div>
              <div>
                <h4>Total price with gift:</h4>
                {TpriceWgift}
              </div>
              <button>
                <Link to="/">Return</Link>
              </button>
            </>
          )}
        </main>
      ) : (
        <main className="recap-container">
          {/* here we display an error page when we try to access the recap page without call to action button. */}
          <div>404 Oops you are in the wrong palce ;)</div>
          <button>
            <Link to="/">Return</Link>
          </button>
        </main>
      )}
    </div>
  );
};

export default Recap;
