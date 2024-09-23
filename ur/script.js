let eCorrectLetter = document.getElementById('correct-zone')
let eCorrectLetterInputs = eCorrectLetter.querySelectorAll('input')
let eWrongSpot = document.getElementById('wrong-spot-zone')
let eWrongSpotWords = eWrongSpot.querySelectorAll('.rows .word')
let eInvalidLetters = document.getElementById("invalid-letters")
let ePossibleWords = document.getElementById("possible-zone")

const handleEvent = (eInput, index, eArray, className) => {
  eInput.addEventListener("keydown", (event) => {
    event.preventDefault();
    if (event.key === 'Backspace' || event.key === 'Delete') {
      eInput.value = ""
      eInput.classList.remove(className);
      if (index > 0) {
        eArray[index - 1].focus();
      }
    } else if (/^[a-zA-Z]$/.test(event.key)) {
      eInput.value = event.key
      eInput.classList.add(className);
      if (index < wordLength - 1) {
        eArray[index +1].focus();
      }
    } else {
      eInput.value = ""
    }
  });
};
let wordLength = 5

Array.from(eCorrectLetterInputs).forEach((input, index) => {
  handleEvent(input, index, eCorrectLetterInputs, 'correct')
});

Array.from(eWrongSpotWords).forEach((word) => {
  let wordWrongSpot = word.querySelectorAll('.letter')
  Array.from(wordWrongSpot).forEach((input, index) => {
    handleEvent(input, index, wordWrongSpot, 'wrong-spot')
  })
})

const addRowBtn = document.getElementById('add-row')
addRowBtn.addEventListener('click', () => {
  const newRow = document.createElement('div');
  newRow.classList.add('word');
  for (let i = 0; i < wordLength; i++) {
    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('letter');
    input.maxLength = 1;
    newRow.appendChild(input);
  }
  let inputs = newRow.querySelectorAll('input')
  Array.from(inputs).forEach((input, index) => {
    handleEvent(input, index, inputs, 'wrong-spot')
    if (index === 0) {
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace' || event.key === 'Delete') {
          newRow.remove()
        }
      })
    }
  })
  document.getElementById('wrong-spot-rows').appendChild(newRow);
})

const getValidLetters = () => {
  let corrects = Array.from(eCorrectLetterInputs).map(e => {
    return e.value.toLowerCase()
  })
  eWrongSpotWords = eWrongSpot.querySelectorAll('.rows .word')
  let wrongSpot = Array.from(eWrongSpotWords).map(e => {
    return Array.from(e.querySelectorAll('input'))
      .map(input =>  input.value.toLowerCase())
  })
  return { corrects, wrongSpot }
}

const guessBtn = document.getElementById('guess')

guessBtn.addEventListener('click', async () => {
  let validLetters = getValidLetters();
  const correctPattern = validLetters.corrects
    .map(char => char === "" ? "?" : char).join("");
  const frequencyMin = 0;

  let possibleWords = [];
  try {
    const response = await fetch(`https://api.datamuse.com/words?sp=${correctPattern}&md=f`);
    const data = await response.json();
    
    possibleWords = data.filter(wordObj => {
      const frequency = parseFloat(wordObj.tags?.find(tag => tag.startsWith('f:'))?.slice(2)) || 0;
      return frequency >= frequencyMin && wordObj.word.length == 5;
    }).map(wordObj => wordObj.word);  
    
  } catch (error) {
    console.error('Error:', error);
  }

  validLetters.wrongSpot.forEach(letters => {
    letters.forEach(letter => {
      possibleWords = possibleWords
        .filter(wordObj => letter === "" || wordObj.includes(letter))
    })
  })

  let wrongSpotPattern = validLetters.wrongSpot
    .map(letters => 
      new RegExp(letters.map(letter =>
        letter === "" ? "[a-zA-Z]" : letter).join('')))
    .filter(pattern => pattern.source.toString() != "[a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z][a-zA-Z]")
      
  wrongSpotPattern.forEach(pattern => {
    possibleWords = possibleWords.filter(wordObj => !pattern.test(wordObj))
  })

  possibleWords = possibleWords
    .filter(wordObj => !(new RegExp(`[${eInvalidLetters.value}]`)).test(wordObj))
  
  ePossibleWords.innerHTML = ""
  if (possibleWords.length > 0) {
    possibleWords.forEach(wordObj => {
      let wordDiv = document.createElement('div');
      wordDiv.textContent = wordObj
      wordDiv.classList.add('possible-word')
      ePossibleWords.appendChild(wordDiv)
    })
  } else {
    ePossibleWords.textContent = "No possible words found"
  }
})

eInvalidLetters.addEventListener('keydown', (event) => {
  event.preventDefault();
  let value = eInvalidLetters.value
  let validLetters = getValidLetters();
  if (/^[a-zA-Z]$/.test(event.key)) {
    if (
      validLetters.corrects.includes(event.key) ||
      validLetters.wrongSpot.some(letters => letters.includes(event.key))
    ) {
      eInvalidLetters.value = value
    } else {
      eInvalidLetters.value = value + event.key
    }
  } else if (event.key === 'Backspace' || event.key === 'Delete') {
    eInvalidLetters.value = value.slice(0, -1)
  }
})

document.getElementById('restart').addEventListener('click', () => {
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
      const classesToKeep = 'letter';
      input.className = input.classList.contains(classesToKeep) ? classesToKeep : '';
      input.value = '';
      ePossibleWords.innerHTML = ""
  });
});
