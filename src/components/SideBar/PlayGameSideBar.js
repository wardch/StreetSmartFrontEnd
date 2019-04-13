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
import './sidebar.sass'

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
      return 'Click a street to begin guessing...'
    } else if ((clickedStreet && clickedStreet.streetName) === (currentStreetGuess && currentStreetGuess.streetName)) {
      return 'Correct! Click a new street...'
    } else {
      return 'Type a street name...'
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
        <h3 className='sidebar--playing-sidebar__hint-row__initial_header_prompt'>Click a street to begin guessing!</h3>
        <hr/>
      </div>)
    } else {
      return null
    }
  }

  render(){
      // CONTINUE FROM HERE. Fix the css, timer is displaying funkily.
      console.log("$$$$$".repeat(50));
      console.log('this.props.options', this.props.options);
      return(
        <div className='sidebar--playing-sidebar'>
          <Row className='timer-and-score__container'>
            <Col xs='6' sm='6' md='6' lg='6'>
              <CountDownTimer
              initialTimerSeconds={this.props.initialTimerSeconds}
              timeRemaingOnGameEnd={this.props.timeRemaingOnGameEnd}
              stopTimer={this.props.gameMode === 'post-playing'}/>
            </Col>
            <Col xs='6' sm='6' md='6' lg='6'>
              <div className='sidebar--playing-sidebar__score-div'>
                <h1>Score</h1>
                <h2>{this.displayScore(this.props.allStreets)}</h2>
              </div>
            </Col>
          </Row>
          <hr/>
          <Row className='sidebar--playing-sidebar__hint-row'>
            <Col>
              <Row>
                {this.displayStarterPrompt(this.props.allStreets)}
                <TableOfStreets streets={this.props.allStreets} currentStreetGuess={this.props.currentStreetGuess}/>
              </Row>
            </Col>
          </Row>
          <div className={this.setSelectionBoxCss(this.props.currentStreetGuess)}>
            <hr/>
            <Select
              maxMenuHeight={125}
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
          <div className='sidebar--playing-sidebar__image_and_modal_container'>
            <ClickedFeaturesPhotos/>
            <PostGameModal gameMode={this.props.gameMode}/>
          </div>
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
