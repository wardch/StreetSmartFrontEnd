import React, { Component } from 'react';
import {fancyTimeFormat} from '../../utils/index'
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

  componentWillUnmount() {
    this.props.timeRemaingOnGameEnd(this.state.timeRemainingInSeconds)
    clearInterval(this.timer)
  }

  decrementTimer(){
    if(this.state.timeRemainingInSeconds > 0) {
      this.setState({timeRemainingInSeconds: this.state.timeRemainingInSeconds - 1})
    } else {
      this.props.timeRemaingOnGameEnd(0)
      clearInterval(this.timer)
    }
  }

  render(){
    return(
      <table className='coundown-timer__table table'>
        <thead>
          <tr>
            <th>
              <h1>Timer</h1>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
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
              <p>{fancyTimeFormat(this.state.timeRemainingInSeconds)}</p>
            </td>
          </tr>
        </tbody>
      </table>
      )
  }
}
