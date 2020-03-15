import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./style.css"

if(process.env.NODE_ENV === "production"){
    ReactDOM.hydrate(<App />, document.getElementById("root"))
}
else{
    ReactDOM.render(<App />, document.getElementById("root")) 
};
