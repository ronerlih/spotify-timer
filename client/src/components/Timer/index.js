import React from "react";
import Second from "../Clock/Second"
import Hour from "../Clock/Hour"
import Minute from "../Clock/Minute"
import Millisecond from "../Clock/Millisecond"
import Face from "../Clock/Face"
import "./style.css"
import moment from "moment"
import TimerInput from "../Timer/TimerInput"

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      millisecond: 0,
      second: 0,
      secondDeg: "",
      minute: 0,
      minuteDeg: "",
      hour: 0,
      hourDeg: "",
      timerInput: ""
    }
  }

  updateClock = () => {
    console.log(this.state.second);
    let time = moment.duration({
      seconds: this.state.second,
      minutes:this.state.minute,
      hours: this.state.hour});

    console.log(time);

    // time = moment(time)
    // time = moment();
    console.log('update clock');
    console.log(time);
    this.setState({ millisecond: time.milliseconds() / 2.77777777778 });
    this.setState({ secondDeg: time.seconds() * 6 });
    this.setState({ minuteDeg: time.minutes() * 6 + this.state.secondDeg / 60 });
    console.log(time.hours());
    this.setState({ hourDeg: ((time.hours() % 12) / 12) * 360 + 90 + this.state.minuteDeg / 12 });
  }

  timedUpdate = () => {
    this.updateClock();
    setTimeout(this.timedUpdate, 1);
  }

  componentWillMount() {
    this.updateClock();
  }
  
  handleSubmit = e => {
    e.preventDefault();
    console.log("submit");
    // this.timedUpdate();
    this.updateClock();


  }
  handleInputChange = e => {
    let value = e.target.value;
    let name = e.target.name;

    console.log(name, value);
    this.setState({ [name]: value })
    this.updateClock();
    
  }

  render() {
    return (
      <div className="circle my-auto">
        <div style={{ textAlign: "center", marginTop: "-80px" }}>
          <TimerInput value={this.state} onClick={this.handleSubmit} onChange={this.handleInputChange} />
        </div>
        <Face>
          {/* <Millisecond deg={this.state.millisecond} /> */}
          <Second deg={this.state.secondDeg} />
          <Hour deg={this.state.hourDeg} />
          <Minute deg={this.state.minuteDeg} />
        </Face>
      </div>
    );
  }
}

export default Timer;
