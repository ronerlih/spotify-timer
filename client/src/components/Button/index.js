import React from "react";
import "./style.css"

function Button (props){
  let disable = props.disable ? "disable" : "";
  return(
    <button className="btn bg-dark" style={props.style}disabled={disable} onClick={props.onClick}>
      {props.children}
      
    </button>
  )
}
export default Button;