import React, { useState } from 'react'
import veg from "../../assets/vegs.png"
import nonveg from "../../assets/non-veg.png"
import "./list.css"

const Lists = ({List}) => {
    
    
    const [show,setShow]= useState(true)
   
const summaryStyle ={display: show ?"block":'none'}
  return (
    <div>
  {List.map((item, key) => {
    {console.log(item,"itemm")}
    return (
      <div  className="lists">
        {item.arr_items.map((i) => (
          <div style={summaryStyle}>
            <div className="list">
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <img style={{ width: 20, height: 20 }} src={i?.vegid == 1 ? veg : nonveg} alt="veg" />
                <span>{i.name}</span>
              </div>
              <span style={{ display: "flex", gap: "1rem" }}>₹{i.price}</span>
            </div>
            <div>
              <span style={{ fontSize: "14px", color: "#8e8e8e", fontWeight: 100 }}>{i.description}</span>
            </div>
          </div>
        ))}
      </div>
    );
  })}
</div>
  )
}

export default Lists
