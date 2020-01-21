import React from "react";
import Button from "../../Button"
import "./style.css"
function TimerInput(props){
  return(
    <div>
      <form>
        <input name="hour" placeholder="00" type="text" className="timerInput" value={props.value.hour == 0 ? "" : props.value.hour} onChange={props.onChange}/>
        :<input name="minute" placeholder="00" type="text" className="timerInput" value={props.value.minute == 0 ? "" : props.value.minute} onChange={props.onChange}/>
        :<input name="second" placeholder="00" type="text" className="timerInput" value={props.value.second == 0 ? "" : props.value.second} onChange={props.onChange}/>
        <br/>
        <Button onClick={props.onClick}>start</Button >
      </form>
    </div>
  )
}
export default TimerInput;