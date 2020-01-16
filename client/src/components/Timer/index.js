import React from "react";
import Second from "../Clock/Second"
import Face from "../Clock/Face"
import "./style.css"
import moment from "moment"

class Timer extends React.Component {
 constructor(props){
   super(props);
   this.state = {
    millisecond: 0,
    second: 0,
    minute:0,
    hour:0
  }
 }

  componentWillMount(){
      const updateClock = () =>{
          var now = moment();
          console.log(now);
          this.setState({millisecond: now.millisecond() / 2.77777777778});
          // this.setState({second: now.seconds() * 6});
          // console.log(now.millisecond());
          this.setState({minute: now.minutes() * 6 + this.state.second / 60});
          this.setState({hour: ((now.hours() % 12) / 12) * 360 + 90 + this.state.minute / 12});
      }
  
      function timedUpdate () {
          updateClock();
          setTimeout(timedUpdate, 1);
      }
    
      timedUpdate();
  }

  render(){
    return (
    <div className="circle">
      <Face>
       <Second deg={this.state.second} />
      </Face>
        {/* <Hour /> */}
        {/* <div id="hour" className="hour"></div> */}
        {/* <div id="minute" className="minute"></div> */}
        {/* <div id="second" className="second"></div> */}
        {/* <Minutes deg={this.state.secondsDeg} /> */}
    </div>
  );}
}

export default Timer;
