export function fancyTimeFormat(time)
{
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

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
