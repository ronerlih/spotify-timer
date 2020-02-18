import React from "react";
import Button from "../../Button";
import "./style.css";
function TimerInput(props) {
    return (
        <div>
            <form>
                <input
                    name="hour"
                    placeholder="00"
                    type="number"
                    className="timerInput"
                    value={props.value.hour == 0 ? "" : props.value.hour}
                    onChange={props.onChange}
                />
                :
                <input
                    name="minute"
                    placeholder="00"
                    type="number"
                    className="timerInput"
                    value={props.value.minute == 0 ? "" : props.value.minute}
                    onChange={props.onChange}
                />
                :
                <input
                    name="second"
                    placeholder="00"
                    type="number"
                    className="timerInput"
                    value={props.value.second == 0 ? "" : props.value.second}
                    onChange={props.onChange}
                />
                <br />
                <Button
                    disable={!props.submitActive}
                    style={{ width: "50px", marginRight: "10px" }}
                    onClick={props.onClick}
                >
                    <i class="fa fa-play"></i>
                </Button>
                <Button onClick={props.onStop} style={{ width: "50px" }}>
                <i class="fa fa-stop"></i>

                </Button>
            </form>
        </div>
    );
}
export default TimerInput;
