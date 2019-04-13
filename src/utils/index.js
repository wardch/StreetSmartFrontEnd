export function ordinal_suffix_of(i) {
    if(!i) { return 'N/A'}
    var j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
}

export function dublineseMyName(firstName, lastName){
  if(firstName[0].toLowerCase() === 'a') {
    let randomNumber = Math.random()
    if(randomNumber < 0.3) {
      return `Any-Yolks ${firstName}`
    } else {
      return `Alriiite ${firstName}`
    }
  } else if(firstName[0].toLowerCase() === 'b') {
    return `Battered ${firstName} Bar ${lastName}`
  } else if(firstName[0].toLowerCase() === 'c') {
    return `${firstName} Curry-Chips ${lastName}`
  } else if (firstName[0].toLowerCase() === 'd') {
    return `${firstName} Dribbly-Jocks ${lastName}`
  } else if (firstName[0].toLowerCase() === 'g') {
    return `Gizmo ${firstName} ${lastName}`
  } else if (firstName[0].toLowerCase() === 'h') {
    return `Hill-16 ${firstName}`
  } else if (firstName[0].toLowerCase() === 'j') {
    return `Jaynius ${firstName}`
  } else if (firstName[0].toLowerCase() === 'm') {
    let randomNumber = Math.random()
    if(randomNumber < 0.5) {
      return `Monto ${firstName} ${lastName}`
    } else {
      return `Mixer ${firstName} ${lastName}`
    }
  } else if (firstName[0].toLowerCase() === 's') {
    return `SpicyBag ${firstName} ${lastName}`
  } else if (firstName[0].toLowerCase() === 't') {
    return `${firstName} Three-in-One ${lastName}`
  } else {
    return `${firstName} CopperFaced ${lastName}s`
  }
}
