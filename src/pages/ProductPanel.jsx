import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Context } from "../context/AppContext.jsx";
import DropDownMenu from "../components/DropDownMenu.jsx";
import PanelTable from "../components/PanelTable.jsx";
const ProductPanel = () => {
  const [selected, setSelected] = useState(null);
  const [qty, setQty] = useState(0);

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

  const handleAdd = () => {
    if (selected != null && qty != 0) {
      let Qty = qty;
      const item = store.filter((item) => item.id === selected);
      if (item[0].is_gift && Currentcredit - item[0].gift_price * Qty >= 0) {
        if (item[0].qty >= Qty) {
          addToPPanel({
            id: uuidv4(),
            item: item[0],
            totalPrice: Qty * item[0].gift_price,
            Qty: Qty,
            label: "included in the gift credit",
          });
          setCredit((prev) => prev - item[0].gift_price * Qty);
          //update  rest Qty
          UpdateStore(item[0].id, item[0].qty - Qty);
        } else if (item[0].qty > 0) {
          addToPPanel({
            id: uuidv4(),
            item: item[0],
            totalPrice: Qty * item[0].gift_price,
            Qty: item[0].qty,
            label: "included in the gift credit",
          });

          setCredit((prev) => prev - item[0].gift_price * item[0].qty);
          //update  rest Qty
          UpdateStore(item[0].id, 0);
        } else {
          window.alert("no remaining quatity of that products!");
        }
      } else if (item[0].is_gift && Currentcredit > 0) {
        if (item[0].qty - Qty < 0) {
          Qty = item[0].qty;
          UpdateStore(item[0].id, 0);
        } else {
          UpdateStore(item[0].id, item[0].qty - Qty);
        }
        addToPPanel({
          id: uuidv4(),
          item: item[0],
          totalPrice: Qty * item[0].gift_price,
          Qty: Qty,
          label: "included in the gift credit",
        });
        //what is let to pay
        let wil = 0;
        let Credit = Currentcredit;
        while (true) {
          if (Credit - item[0].gift_price > 0) {
            Credit -= item[0].gift_price;
            wil++;
          } else {
            break;
          }
        }
        wil = Qty - wil;
        addToPPanel({
          id: uuidv4(),
          item: item[0],
          totalPrice: wil * item[0].price,
          Qty: 1,
          label: "not included in the gift credit",
        });
        setCredit(0);
      } else {
        if (item[0].qty - Qty >= 0) {
          addToPPanel({
            id: uuidv4(),
            item: item[0],
            totalPrice: Qty * item[0].price,
            Qty: Qty,
            label: "not included in the gift credit",
          });
          UpdateStore(item[0].id, item[0].qty - Qty);
        } else if (item[0].qty == 0) {
          window.alert("no remaining quatity of that products!");
        } else if (item[0].qty - Qty < 0) {
          addToPPanel({
            id: uuidv4(),
            item: item[0],
            totalPrice: Qty * item[0].price,
            Qty: item[0].qty,
            label: "not included in the gift credit",
          });
          UpdateStore(item[0].id, 0);
        }
      }
    } else {
      window.alert("You should choose a product and quantity first!");
    }
  };

  return (
    <main className="app-container">
      <div className="purshes-controller">
        {/* here the user start adding products */}
        <div>
          {" "}
          <h3 style={{ display: "inline-block" }}>you have</h3>{" "}
          <h3 style={{ color: "red", display: "inline-block" }}>
            {Currentcredit}
          </h3>{" "}
          <h3 style={{ display: "inline-block" }}> TND as a credit.</h3>
        </div>
        <h4>Choose a product:</h4>
        <div>
          <DropDownMenu
            data={store}
            setSelected={(id) => {
              setSelected(id);
            }}
            selected={selected}
          />
        </div>
        <h4>Quantity:</h4>
        <div>
          <input
            type="number"
            value={qty}
            onChange={(e) => {
              setQty(e.target.value);
            }}
            style={{ padding: "5px", width: "100%" }}
            min="0"
          />
        </div>
        <button
          style={{ padding: "4px", cursor: "pointer" }}
          onClick={handleAdd}
        >
          + add to Panel
        </button>
      </div>

      <div className="panel-container">
        {/* here we display the contole panel of the chosen products */}
        <PanelTable
          PPanel={PPanel}
          addToPPanel={addToPPanel}
          removeFromPPanel={removeFromPPanel}
          Currentcredit={Currentcredit}
          setCredit={setCredit}
        />
        <div>
          <Link
            style={{ width: "20%", margin: "5px auto" }}
            onClick={() => {
              setRecap(true);
            }}
            to="/Recap"
          >
            {" "}
            <button style={{ width: "100%" }}>validate</button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ProductPanel;
