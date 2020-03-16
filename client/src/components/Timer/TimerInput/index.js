import React from "react";
import Button from "../../Button";
import "./style.css";
function TimerInput(props) {
    return (
            <form>
                <input
                    name="hour"
                    placeholder="00"
                    type="number"
                    min="0"
                    max="59"
                    className="timerInput"
                    value={props.value.hour === 0 ? "" : props.value.hour}
                    onChange={props.onChange}
                />
                <div className="colomn">:</div>
                <input
                    name="minute"
                    placeholder="00"
                    type="number"
                    className="timerInput"
                    min="0"
                    max="59"
                    value={props.value.minute === 0 ? "" : props.value.minute}
                    onChange={props.onChange}
                />
                <div className="colomn">:</div>
                <input
                    name="second"
                    placeholder="00"
                    type="number"
                    min="0"
                    max="59"
                    className="timerInput"
                    value={props.value.second === 0 ? "" : props.value.second}
                    onChange={props.onChange}
                />
                <br />
                <Button
                    disable={!props.submitActive}
                    style={{ width: "50px", marginRight: "10px" }}
                    onClick={props.onClick}
                >
                    <i className="fa fa-play"></i>
                </Button>
                <Button onClick={props.onStop} style={{ width: "50px" }}>
                <i className="fa fa-stop"></i>

                </Button>
            </form>
    );
}
export default TimerInput;
