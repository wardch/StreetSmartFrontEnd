import React, { Component } from 'react';
import Collapse from 'react-bootstrap/Collapse'

function displayStreetName(street, currentStreetGuess) {
  if(!street){
    return null
  } else if(street.guessed && street.streetName === currentStreetGuess.streetName){
    return (
      <span className='sidebar__span-correct_street_guess'>{street.streetName} <br/> <i className="fas fa-check animated heartBeat"></i></span>
      )
  } else if(street.guessed){
    return (
      <span className='sidebar__span-correct_street_guess'>{street.streetName} <br/><i className="fas fa-check"></i></span>
      )
  } else {
    return (
      <span>{street.streetName} <br/><i className="fas fa-question"></i></span>
      )
  }
}

function StreetTableRow({streetTriple, currentStreetGuess}){
  let [street1, street2, street3] = streetTriple
  return (
      <tr>
        <td>{displayStreetName(street1, currentStreetGuess)}</td>
        <td>{displayStreetName(street2, currentStreetGuess)}</td>
        <td>{displayStreetName(street3, currentStreetGuess)}</td>
      </tr>
    )
}

// ({streets, currentStreetGuess})

export default class TableOfStreets extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
      buttonText: 'View list of street names'
    };
  }

  _handleButtonClick(){
    let {open} = this.state
    this.setState({ open: !open })
  }

  toggleStreetLinkText(){
    let {open} = this.state
    if(open) {
      return <span>Hide list of street names <i className="fas fa-angle-up rotate-icon"> </i></span>
    } else {
      return <span>Need a hint? View list of all Dublin street names <i className="fas fa-angle-down rotate-icon"></i></span>
    }
  }

  render() {
   const { open } = this.state;
   let chunk = 3
   let streetsInThrees = []
   for(let i = 0; i < this.props.streets.length; i += chunk) {
    streetsInThrees.push(this.props.streets.slice(i, i + chunk))
    }
   streetsInThrees = streetsInThrees.filter(x => x)

   return (
     <div>
       <p
         onClick={() => this._handleButtonClick() }
         aria-controls="street-names-collapse-text"
         className='sidebar--playing-sidebar__hint-row__show_streets_hint_text'
         aria-expanded={open}>
         {this.toggleStreetLinkText()}
       </p>
       <Collapse in={this.state.open}>
       <table className='sidebar--playing-sidebar__hint-row__table table'>
         <thead>
           <tr>
             <th colSpan='3'>All Street Names</th>
           </tr>
         </thead>
         <tbody>
           {streetsInThrees.map((streetTriple, idx) => {
               return (
                 <StreetTableRow key={idx} streetTriple={streetTriple} currentStreetGuess={this.props.currentStreetGuess}/>
                 )
             })}
         </tbody>
       </table>
       </Collapse>
     </div>
   );
 }

}
