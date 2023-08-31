import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/AppContext.jsx";
import { v4 as uuidv4 } from "uuid";
const PanelTable = (props) => {
  const [Nqty, setNqty] = useState({});
  const [toUpdate, setToUpdate] = useState(0);
  //   const { PPanel, addToPPanel, removeFromPPanel, setCredit, CurrentCredit } =
  //     props;
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

  const deleteP = (id) => {
    removeFromPPanel(id);
  };
  const updateP = (id) => {
    setToUpdate(id);
  };
  const commit = () => {
    console.log(Nqty);
    //remove
    removeFromPPanel(Nqty.rId);
    //add new item to panel
    let Qty = Nqty.qty;
    let selected = Nqty.id;
    const item = store.filter((i) => i.id === selected);
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
  };
  return (
    <table>
      <tr>
        <th>Product Name</th>
        <th>Quatity</th>
        <th>Total Price</th>
        <th>Label</th>
        <th>Edit</th>
      </tr>
      {PPanel.length > 0 ? (
        <>
          {PPanel.map((item) => (
            <tr id={item.id}>
              <td>{item.item.name}</td>
              <td>
                {item.Qty}
                <>
                  {toUpdate === item.id && (
                    <>
                      <input
                        type="number"
                        value={Nqty.qty}
                        onChange={(e) => {
                          setNqty({
                            qty: e.target.value,
                            id: item.item.id,
                            rId: item.id,
                          });
                        }}
                        style={{
                          padding: "5px",
                          width: "50%",
                          marginLeft: "5px",
                        }}
                        min="1"
                      />
                      <button
                        style={{
                          padding: "4px",
                          cursor: "pointer",
                          marginLeft: "5px",
                        }}
                        onClick={commit}
                      >
                        update
                      </button>
                    </>
                  )}
                </>
              </td>
              <td>{item.totalPrice}</td>
              <td>{item.label}</td>
              <td
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <button
                  style={{ padding: "4px", cursor: "pointer" }}
                  onClick={() => {
                    updateP(item.id);
                  }}
                >
                  update
                </button>
                <button
                  style={{ padding: "4px", cursor: "pointer" }}
                  onClick={() => {
                    deleteP(item.id);
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </>
      ) : (
        <tr>No bought products Yet!</tr>
      )}
    </table>
  );
};

export default PanelTable;
