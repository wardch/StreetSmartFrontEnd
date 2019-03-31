import React, { Component } from 'react';
import './sidebar.sass'


export default class CountDownTimer extends Component {
  constructor(props){
    super(props)
    this.timer = null;
    this.state = {
      timeRemainingInSeconds: this.props.initialTimerSeconds
    }
  }

  componentDidMount(){
    this.timer = setInterval(() => {
        this.decrementTimer()
      }, 1000)
  }

  decrementTimer(){
    if(this.props.stopTimer) {
      this.props.timeRemaingOnGameEnd(this.state.timeRemainingInSeconds)
      clearInterval(this.timer)
    } else if(this.state.timeRemainingInSeconds > 0) {
      this.setState({timeRemainingInSeconds: this.state.timeRemainingInSeconds - 1})
    } else {
      this.props.timeRemaingOnGameEnd(0)
      clearInterval(this.timer)
    }
  }

  displayTime(time) {
    //TODO: Pad the seconds so when single digits they're preceeded by a 0.
    let minutes = Math.floor(time / 60)
    let seconds = time - (minutes * 60)
    return `${minutes} : ${seconds}`
  }


  render(){
    return(
      <div className='sidebar--playing-sidebar__timer-div'>
        <h2 >Timer</h2>
        <div className="countdown-timer">
          <div className="countdown-timer__circle-container">
            <svg>
            <circle className='countdown-timer__background-circle'
              r="30"
              cx="70"
              cy="49"/>
              <circle
                r="30"
                cx="70"
                cy="49"
                style={{
                  animation: `countdown-animation ${this.props.initialTimerSeconds}s linear`
                  }}/>
            </svg>
          </div>
          <div className="countdown-timer__text">
            {this.displayTime(this.state.timeRemainingInSeconds)}
          </div>
        </div>
      </div>

      )
  }
}
