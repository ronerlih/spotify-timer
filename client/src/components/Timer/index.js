import React from "react";
import Second from "../Clock/Second"
import Hour from "../Clock/Hour"
import Minute from "../Clock/Minute"
import Millisecond from "../Clock/Millisecond"
import Face from "../Clock/Face"
import "./style.css"
import moment from "moment"
import TimerInput from "../Timer/TimerInput"
import Sound from 'react-sound';

const TIMER_INTERVAL = 1;

class Timer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      done:false,
      millisecond: 0,
      second: 0,
      secondDeg: "",
      minute: 0,
      minuteDeg: "",
      hour: 0,
      hourDeg: "",
      timerInput: "",
      soundState: false
    }
  }
  updateClock = () => {
    console.log(this.state.second);
    if(!this.state.second && !this.state.minute ){
      this.setState({done:true})
      this.setState({soundState: true})
      console.log("done");
      return;
    }
    let second, minute, hour;
    if(this.state.second == 0 && this.state.minute > 0){
      second = 60;
      minute = this.state.minute - 1;
      hour = this.state.hour;
      this.setState({
        second: 60,
        minute : this.state.minute - 1,
        hour : this.state.hour
      })
    }
    else if(this.state.second > 0){

      second = this.state.second - 1;
      minute = this.state.minute;
      hour = this.state.hour;
      this.setState({
        second: second,
        minute :minute,
        hour : hour
      })
    }

    let time = moment.duration({
      seconds: second,
      minutes:minute,
      hours: hour});


    // time = moment(time)
    // time = moment();
    console.log('update clock');
    this.setState({ millisecond: time.milliseconds() / 2.77777777778 });
    this.setState({ secondDeg: time.seconds() * 6 });
    this.setState({ minuteDeg: time.minutes() * 6 + this.state.secondDeg / 60 });
    console.log(time.hours());
    this.setState({ hourDeg: ((time.hours() % 12) / 12) * 360 + 90 + this.state.minuteDeg / 12 });
  }
  setClock = () => {
  
    let time = moment.duration({
      seconds: this.state.second ,
      minutes:this.state.minute,
      hours: this.state.hour});


    // time = moment(time)
    // time = moment();
    console.log('update clock');
    this.setState({ millisecond: time.milliseconds() / 2.77777777778 });
    this.setState({ secondDeg: time.seconds() * 6 });
    this.setState({ minuteDeg: time.minutes() * 6 + this.state.secondDeg / 60 });
    console.log(time.hours());
    this.setState({ hourDeg: ((time.hours() % 12) / 12) * 360 + 90 + this.state.minuteDeg / 12 });
  }

  timedUpdate = () => {
    if(!this.state.done){
      this.updateClock();
      setTimeout(this.timedUpdate, TIMER_INTERVAL);
    }
    else{
      this.setState({done: false})
    }
    
  }

  componentWillMount() {
    this.setClock();
  }
  
  handleSubmit = e => {
    e.preventDefault();
    console.log("prevent defaults");
    console.log("submit");
    // this.timedUpdate();
    this.timedUpdate();


  }
  handleInputChange = e => {
    let value = e.target.value;
    let name = e.target.name;

    value = value < 10 ? '0' + value : value; 
    console.log(name, value);
    this.setState({ [name]: value },
    // this.updateClock
    this.setClock
    )
    
  }

  render() {
    return (
      <div className="circle my-auto">
        <div style={{ textAlign: "center", marginTop: "-150px" }}>
          <TimerInput value={this.state} onClick={this.handleSubmit} onChange={this.handleInputChange} />
        </div>
        {}
        <Face>
          {/* <Millisecond deg={this.state.millisecond} /> */}
          <Second deg={this.state.secondDeg} />
          <Hour deg={this.state.hourDeg} />
          <Minute deg={this.state.minuteDeg} />
        </Face>
        <Sound 
              url="Ding-sound-effect.mp3"
              playStatus={this.state.soundState ? Sound.status.PLAYING : Sound.status.PAUSED}
              volume="100"
              autoLoad='true'
              />
      </div>
    );
  }
}

export default Timer;
