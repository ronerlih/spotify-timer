import React from "react";
import "./style.css"

function Button (props){
  return(
    <button className="btn bg-dark">
      {props.children}
    </button>
  )
}
export default Button;