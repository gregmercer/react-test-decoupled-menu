import React, { useState, useEffect } from "react";
import "./App.css";
import MenuBar from "./MenuBar";
import fetch from "node-fetch";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

function App() {
  const [data, setData] = useState([]);

  const menuId = "main";
  async function getData() {
    let response = await fetch(
      `https://0b2a-2600-1700-2d20-2260-592d-9ba5-4973-f736.ngrok.io/system/menu/${menuId}/linkset`
    );
    let result = await response.json();
    setData(result.linkset[0].item);
  }

  useEffect(() => {
    console.log("useEffect");
    getData();
  }, []);

  return (
    <div className="App">
      <h1 className="title">Decoupled Menus</h1>
      <MenuBar data={data} />
    </div>
  );
}

export default App;
