import React, { useState } from "react";
import { ReactComponent as Up } from "../svg/Up.svg";
import { ReactComponent as Down } from "../svg/Down.svg";

function DropDown({ menu, setMenu,text,setText,direction,setDirection }) {
  const Menus = ["TopRated", "MostDownloaded", "Age"];

  return (
    menu && (
      <div className="bg-trasnsparent p-4 w-52 shadow-lg absolute -left-30 top-24">
        <ul>
          {Menus.map((menu) => (
            <li
              className={`p-2 text-lg cursor-pointer rounded bg-gray-300 -left-30 ${
                menu ? "block" : "hidden"
              }`}
              style={{
                cursor: "pointer",
                marginTop: "0.5rem",
                backgroundColor: "gray", 
                maxWidth: "10rem",
                border: "1px solid #ccc", 
                transition: "background-color 0.3s", 
                ":hover": { backgroundColor: "#c0c0c0" }, 
              }}
              onClick={() => {setMenu(false);setText(menu)}}
              key={menu}
            >
              {menu}
              {menu === "Age" && <><Up onClick={(e)=>{
                e.stopPropagation()
                setDirection("UP")
                setText(menu)
                setMenu(false)
              }}/><Down onClick={(e)=>{
                  e.stopPropagation()
                  setDirection("DOWN")
                  setText(menu)
                  setMenu(false)
                  }}/></>}
            </li>
          ))}
        </ul>
      </div>
    )
  );
}

export default DropDown;
