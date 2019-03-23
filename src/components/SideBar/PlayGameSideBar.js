import React, {Component} from 'react';
import {connect} from 'react-redux'
import Select from 'react-select'
import ClickedFeaturesPhotos from './ClickedFeaturesPhotos'
import TableOfStreets from './TableOfStreets'
import CountDownTimer from './CountDownTimer'
import PostGameModal from './PostGameModal'
import {onSelectionGuess, onKeyDownSelectionBox, onTimeRemaingOnGameEnd} from '../../actions/mapActions'
import {getCurrentClickedStreet, getCurrentStreetGuess, getAllStreets, getAllGuessingOptions, getGameTimerTotalInitalSeconds, getSelectionBoxStyle, getGameMode} from '../../selectors/gameSelectors'
import {isEmpty} from 'lodash'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class PlayGameSideBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectRef: React.createRef(),
      selectionBoxCss: 'sidebar__selector-container'
    }
  }

  componentDidUpdate(prevProps, nextProps) {
    if(!isEmpty(this.props.clickedStreet)) {
      this.state.selectRef.current.focus()
    }
  }

  displayScore(streets) {
    let guessed = streets.filter(street => street.guessed).length
    return `${guessed}/${streets.length}`
  }

  setSelectionBoxCss(currentStreetGuess){
    let newSelectionBoxCss = 'sidebar__selector-container'
    if(!isEmpty(currentStreetGuess) && !currentStreetGuess.isCurrentGuessCorrect){
        newSelectionBoxCss = 'sidebar__selector-container animated shake'
      }
    return newSelectionBoxCss
  }

  findPlaceHolder(clickedStreet, currentStreetGuess, streets){
    let guessed = streets.filter(street => street.guessed).length

    if(guessed === streets.length) {
      return 'Correct! You guessed all the streets!'
    } else if(isEmpty(clickedStreet)){
      return 'Click a street to start guessing...'
    } else if ((clickedStreet && clickedStreet.streetName) === (currentStreetGuess && currentStreetGuess.streetName)) {
      return 'Correct! Click a new street...'
    } else {
      return 'Type a streetname...'
    }
  }

  findMenuOpen(clickedStreet, currentStreetGuess) {
    if(isEmpty(clickedStreet)){
      return false
    } else if ((clickedStreet && clickedStreet.streetName) === (currentStreetGuess && currentStreetGuess.streetName)) {
      return false
    } else {
      return true
    }
  }

  displayStarterPrompt(streets){
    let guessed = streets.filter(street => street.guessed).length
    if (guessed === 0) {
      return(
      <div>
        <h1>Click a street to begin guessing!</h1>
        <hr/>
      </div>)
    } else {
      return null
    }
  }

  render(){
      return(
        <div>
          {this.displayStarterPrompt(this.props.allStreets)}
        <Row>
          <Col xs='6' sm='6' md='6' lg='6'>
            <div>
              <h4>Score</h4>
              <h4>{this.displayScore(this.props.allStreets)}</h4>
            </div>
          </Col>
          <Col>
            <CountDownTimer
              initialTimerSeconds={this.props.initialTimerSeconds}
              timeRemaingOnGameEnd={this.props.timeRemaingOnGameEnd}
              stopTimer={this.props.gameMode === 'post-playing'}/>
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col>
            <TableOfStreets streets={this.props.allStreets} currentStreetGuess={this.props.currentStreetGuess}/>
          </Col>
        </Row>
        <div className={this.setSelectionBoxCss(this.props.currentStreetGuess)}>
          <Select
            ref={this.state.selectRef}
            onChange={this.props.onSelectionGuess}
            value={''}
            styles={this.props.colourStyles}
            onKeyDown={this.props.onKeyDownSelectionBox}
            options={this.props.options}
            isDisabled={isEmpty(this.props.clickedStreet)}
            menuIsOpen={this.findMenuOpen(this.props.clickedStreet, this.props.currentStreetGuess)}
            placeholder={this.findPlaceHolder(this.props.clickedStreet, this.props.currentStreetGuess, this.props.allStreets)}
          />
          </div>
        <ClickedFeaturesPhotos/>
        <PostGameModal gameMode={this.props.gameMode}/>
        </div>
      )
    }
}

const mapStateToProps = state => {
  return {
    clickedStreet: getCurrentClickedStreet(state),
    currentStreetGuess: getCurrentStreetGuess(state),
    allStreets: getAllStreets(state),
    options: getAllGuessingOptions(state),
    initialTimerSeconds: getGameTimerTotalInitalSeconds(state),
    colourStyles: getSelectionBoxStyle(state),
    gameMode: getGameMode(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSelectionGuess: (event) => dispatch(onSelectionGuess(event)),
    onKeyDownSelectionBox: (event) => dispatch(onKeyDownSelectionBox(event)),
    timeRemaingOnGameEnd: (seconds) => dispatch(onTimeRemaingOnGameEnd(seconds)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PlayGameSideBar)
