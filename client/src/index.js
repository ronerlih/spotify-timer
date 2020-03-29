import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./style.css"

if(process.env.NODE_ENV === "production"){
    console.log('using production: hydrate' )
    ReactDOM.hydrate(<App />, document.getElementById("root"))
}
else{
    console.log('using dev: render' )
    ReactDOM.render(<App />, document.getElementById("root")) 
};
