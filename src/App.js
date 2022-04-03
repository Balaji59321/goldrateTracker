import "./App.css";
import { InputGroup, FormControl } from "react-bootstrap";
import { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { Alert } from "react-bootstrap";

function App() {
  const [user, setUser] = useState([
    { rate: 0, quantity: 0, unit: "gm", vat: 0, sgst: 0, cgst: 0, discount: 0 },
  ]);
  console.log(user);
  function changeHandler(e) {
    console.log(typeof +e.target.value);
    setUser((prev) => {
      let newState = [...prev];
      newState[0][e.target.name] = +e.target.value > 0 ? e.target.value : 0;
      return [...newState];
    });
  }

  const priceHandler = () => {
    if (user[0]["unit"] === "kg")
      return user[0]["rate"] * user[0]["quantity"] * 1000;
    else return user[0]["rate"] * user[0]["quantity"];
  };

  const invoice = () =>
    (
      priceHandler() +
      (user[0]["vat"] * priceHandler()) / 100 +
      (user[0]["sgst"] * priceHandler()) / 100 +
      (user[0]["cgst"] * priceHandler()) / 100 -
      (user[0]["discount"] * priceHandler()) / 100
    ).toFixed(2);

  return (
    <div>
      <h3 className="title">Gold Rate Calculator</h3>
      <p>Note: Input for all fields should be of type number</p>
      <div className="result">
        <div className="form">
          <h3>User Details</h3>
          <div className="field">
            <label>Gold Rate</label>
            <input type="text" name="rate" onChange={changeHandler} />
          </div>
          <div className="field">
            <label>Quantity</label>
            <input type="text" name="quantity" onChange={changeHandler} />
          </div>
          <div className="field">
            <label>Unit</label>
            <select value={user.unit} name="unit" onChange={changeHandler}>
              <option value={"gm"}>gm</option>
              <option value={"kg"}>kg</option>
            </select>
          </div>
          <div className="field">
            <label>Wastage (%)</label>
            <input type="text" name="vat" onChange={changeHandler} />
          </div>
          <div className="field">
            <label>SGST (%)</label>
            <input type="text" name="sgst" onChange={changeHandler} />
          </div>
          <div className="field">
            <label>CGST (%)</label>
            <input type="text" name="cgst" onChange={changeHandler} />
          </div>
          <div className="field">
            <label>Discount (%)</label>
            <input type="text" name="discount" onChange={changeHandler} />
          </div>
        </div>

        <div className="form">
          <h3>Calculation Details</h3>
          <div className="field">
            <span>Amount :</span>
            <span>{priceHandler()}</span>
          </div>
          <div className="field">
            <span>Wastage :</span>
            <span>{(user[0]["vat"] * priceHandler()) / 100}</span>
          </div>
          <div className="field">
            <span>SGST :</span>
            <span>{(user[0]["sgst"] * priceHandler()) / 100}</span>
          </div>
          <div className="field">
            <span>CGST :</span>
            <span>{(user[0]["cgst"] * priceHandler()) / 100}</span>
          </div>
          <div className="field">
            <span>Discount :</span>
            <span>{(user[0]["discount"] * priceHandler()) / 100}</span>
          </div>
          <div className="field">
            <span>Total (before round off) :</span>
            <span>{invoice()}</span>
          </div>
          <hr />
          <div className="field">
            <span>Total (after round off) :</span>
            <span>{Math.round(invoice())}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
