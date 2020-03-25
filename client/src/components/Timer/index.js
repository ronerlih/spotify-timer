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
let clearHtmlInterval;
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
        this.inputRef = React.createRef();
    }
    playSound = () => {
        this.setState({ soundState: true });
        setTimeout(() => this.setState({ soundState: false }), 1500);
    };
    updateClock = () => {
        let TimeLeft = moment.duration(startTime.diff(moment()))

        //times up
        if (TimeLeft._milliseconds <= 0){
            this.setState({ done: true ,submitActive : true});
            this.updataState();
            this.playSound();
            setTimeout(this.playSound, 2000);
            setTimeout(this.playSound, 4000);

            this.reloadIframe();
            return;
        }
        else {
        this.updataState();
        this.updataFace();
        }
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
        this.updataFace();
    };
    updataState = () => {
        let TimeLeft = moment.duration(startTime.diff(moment()))
        this.setState({ 
            millisecond: TimeLeft.milliseconds(),
            second: ("0" + TimeLeft.seconds()).slice(-2),
            minute: ("0" + TimeLeft.minutes()).slice(-2),
            hour: ("0" + TimeLeft.hours()).slice(-2)
        } );
    }
    updataFace = () => {
        let TimeLeft = moment.duration(startTime.diff(moment()))
        this.setState({ 
            millisecondDeg: (TimeLeft.milliseconds()  / 2.77777777778)  ,
            secondDeg: (TimeLeft.seconds() * 6) + (((TimeLeft.milliseconds()  / 2.77777777778) ) / 60.0 ),
            minuteDeg: TimeLeft.minutes() * 6 + this.state.secondDeg / 60,
            hourDeg:
            ((TimeLeft.hours() % 12) / 12) * 360 +
            90 +
            this.state.minuteDeg / 12
        } );
    }

    timedUpdate = () => {
        if (!this.state.done && !this.state.paused) {
            this.updateClock();
            setTimeout(this.timedUpdate, TIMER_INTERVAL);
        } else {
            this.setState({ done: false });
        }
    };

    componentDidMount() {
        console.log(this.inputRef.current.focus());
        this.setClock();
        // remove spotify html cover
        // clearHtmlInterval = setInterval(()=>{
        //     let closeButtonPolygon = document.querySelector("polygon");
        //     if(closeButtonPolygon){
        //         closeButtonPolygon.parentElement.parentElement.click();
        //     }
        // }, 1000)
        
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
        this.reloadIframe();
    };

    reloadIframe = () => {
        this.props.refHook.current.src = "";
        this.props.refHook.current.src = this.props.iframeSrc;

    }
    handleSubmit = e => {
        e.preventDefault();
        // this.timedUpdate();
        startTime = moment();
        this.setClock();

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
                        onPause={this.onPause}
                        inputRef={this.inputRef}
                        paused = {this.state.paused}
                    />
                </div>
                
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
                    volume={100}
                    autoLoad={true}
                    position={0}
                />
            </div>
        );
    }
}

export default Timer;
