import React from 'react';


function displayStreetName(street, currentStreetGuess) {
  if(street === null){
    return null
  } else if(street.guessed && street.streetName === currentStreetGuess.streetName){
    return (
      <span className='sidebar__span-correct_street_guess'>{street.streetName} <i className="fas fa-check animated heartBeat"></i></span>
      )
  } else if(street.guessed){
    return (
      <span className='sidebar__span-correct_street_guess'>{street.streetName} <i className="fas fa-check"></i></span>
      )
  } else {
    return (
      <span>{street.streetName} <i className="fas fa-question"></i></span>
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


export default function TableOfStreets({streets, currentStreetGuess}) {

  let chunk = 3
  let streetsInThrees = []
  for(let i = 0; i < streets.length; i += chunk) {
    streetsInThrees.push(streets.slice(i, i + chunk))
  }
  streetsInThrees = streetsInThrees.filter(x => x)
  return (
    <table className='sidebar__table_of_streets'>
      <thead>
        <tr>
          <th colSpan='3'>List Of Streets</th>
        </tr>
      </thead>
      <tbody>
        {streetsInThrees.map((streetTriple, idx) => {
            return (
              <StreetTableRow key={idx} streetTriple={streetTriple} currentStreetGuess={currentStreetGuess}/>
              )
          })}
      </tbody>
    </table>
    )
}
