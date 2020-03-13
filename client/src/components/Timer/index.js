import React from "react";
import Second from "../Clock/Second";
import Hour from "../Clock/Hour";
import Minute from "../Clock/Minute";
import Millisecond from "../Clock/Millisecond";
import Face from "../Clock/Face";
import "./style.css";
import moment from "moment";
import TimerInput from "../Timer/TimerInput";
import Sound from "react-sound";

const TIMER_INTERVAL = 1;
let startTime;
class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            done: false,
            millisecond: 0,
            second: 0,
            secondDeg: "",
            minute: 0,
            minuteDeg: "",
            hour: 0,
            hourDeg: "",
            timerInput: "",
            soundState: false,
            submitActive: true
        };
    }
    playSound = () => {
        this.setState({ soundState: true });
        setTimeout(() => this.setState({ soundState: false }), 1500);
    };
    updateClock = () => {
        // console.log(this.state.millisecond);
        // console.log(moment().millisecond());
        let millisecond, second, minute, hour;
        let TimeLeft = moment.duration(startTime.diff(moment()))

        //times up
        if (TimeLeft._milliseconds <= 0){
            this.setState({ done: true });
            this.playSound();
            setTimeout(this.playSound, 2000);
            setTimeout(this.playSound, 4000);
            console.log("done");
            return;
        }
        else {
           
            this.setState({
                millisecond: TimeLeft.milliseconds(),
                second: TimeLeft.seconds(),
                minute: TimeLeft.minutes(),
                hour: TimeLeft.hours()
            });}
        // }
        // else if (this.state.millisecond == 0 && this.state.second == 0 && this.state.minute > 0) {
        //     millisecond = 1000;
        //     second = 60;
        //     minute = this.state.minute - 1;
        //     hour = this.state.hour;
        //     this.setState({
        //         millisecond: 1000,
        //         second: 60,
        //         minute: minute ,
        //         hour: this.state.hour
        //     });
        // } else  {
        //     // console.log(this.state.millisecond);
        //     millisecond = this.state.millisecond -1;
            
        //     this.setState({
        //         millisecond: millisecond
        //     });
        // }

     
        // time = moment(time)
        // time = moment();
        // console.log("update clock");
        this.setState({ millisecondDeg: (TimeLeft.milliseconds() / 2.77777777778) + 90});
        this.setState({ secondDeg: TimeLeft.seconds() * 6 });
        this.setState({
            minuteDeg: TimeLeft.minutes() * 6 + this.state.secondDeg / 60
        });
        // console.log(time.hours());
        this.setState({
            hourDeg:
                ((TimeLeft.hours() % 12) / 12) * 360 +
                90 +
                this.state.minuteDeg / 12
        });
    };
    setClock = () => {
        startTime = moment();

        let time = {
            milliseconds: +this.state.millisecond,
            seconds: +this.state.second,
            minutes: +this.state.minute,
            hours: +this.state.hour
        }; 
        startTime.add(time)
        let TimeLeft = moment.duration(startTime.diff(moment()))
        console.log(TimeLeft);
        // console.log(time);
        // time = moment(time)
        // time = moment();
        // console.log('TimeLeft');
        // console.log(TimeLeft.milliseconds());
        console.log("update clock");
        this.setState({ millisecondDeg: (TimeLeft.milliseconds()  / 2.77777777778) + 90} );
        this.setState({ secondDeg: TimeLeft.seconds() * 6 });
        this.setState({
            minuteDeg: TimeLeft.minutes() * 6 + this.state.secondDeg / 60
        });
        console.log(TimeLeft.hours());
        this.setState({
            hourDeg:
                ((TimeLeft.hours() % 12) / 12) * 360 +
                90 +
                this.state.minuteDeg / 12
        });
    };

    timedUpdate = () => {
        if (!this.state.done) {
            this.updateClock();
            setTimeout(this.timedUpdate, TIMER_INTERVAL);
        } else {
            this.setState({ done: false });
        }
    };

    componentWillMount() {
        this.setClock();
    }

    onStop = e => {
        e.preventDefault();
        this.setState({
            done: false,
            millisecond: 0,
            second: 0,
            secondDeg: "",
            minute: 0,
            minuteDeg: "",
            hour: 0,
            hourDeg: "",
            timerInput: "",
            soundState: false,
            submitActive: true
        }, this.setClock);
    };

    handleSubmit = e => {
        e.preventDefault();
        // this.timedUpdate();
        this.setState({ submitActive: false });
        this.timedUpdate();
    };
    handleInputChange = e => {
        let value = e.target.value;
        let name = e.target.name;

        value = ("0" + value).slice(-2);
        console.log(name, value);
        this.setState(
            { [name]: value },
            this.setClock
        );
    };

    render() {
        return (
            <div className="circle my-auto">
                <div style={{ textAlign: "center", marginTop: "-150px" }}>
                    <TimerInput
                        submitActive={this.state.submitActive}
                        value={this.state}
                        onClick={this.handleSubmit}
                        onChange={this.handleInputChange}
                        onStop={this.onStop}
                    />
                </div>
                {}
                <Face>
                    <Millisecond deg={this.state.millisecondDeg} />
                    <Second deg={this.state.secondDeg} />
                    <Hour deg={this.state.hourDeg} />
                    <Minute deg={this.state.minuteDeg} />
                </Face>
                <Sound
                    url="Ding-sound-effect.mp3"
                    playStatus={
                        this.state.soundState
                            ? Sound.status.PLAYING
                            : Sound.status.PAUSED
                    }
                    volume="100"
                    autoLoad="true"
                    position="0"
                />
            </div>
        );
    }
}

export default Timer;
