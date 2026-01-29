/**
* @author Rabira Motuma
* @version 1.0.0
* @date 2026-01-28
* @fileoverview This program creates a sequence of letters while it is the users
*          job to find out what that sequence is before they run out of guesses.
*/

// constants
const MAX_GUESS: number = 10;
const SEQ_LENGTH: number = 4;
const LETTERS: string[] = ["A", "B", "C", "D"];

// array
const sequence: string[] = new Array(SEQ_LENGTH);
const guess: string[] = new Array(SEQ_LENGTH);

//variables
let numberOfTries: number = 0;
let rightSpots: number = 0; // green
let rightLetters: number = 0; // orange

// create sequence
for (let counter = 0; counter < SEQ_LENGTH; counter++) {
  const randomPos = Math.floor(Math.random() * SEQ_LENGTH);
  sequence[counter] = LETTERS[randomPos];
}

// introduction
console.log("Welcome to the Letter Guessing Game.");
console.log(`You're goal will be to guess the ${SEQ_LENGTH}-letter sequence only
using the letters: A, B, C ,D. Letters can repeat.`);
console.log(`You have ${MAX_GUESS} guesses. Good Luck!`);

// loop
do {
  // prompt guess
  const guessString: string = prompt(`Enter guess #${numberOfTries + 1}:`)
    || "0";

  // split guess to array
  for (let counter = 0; counter < SEQ_LENGTH; counter++) {
    guess[counter] = guessString[counter]?.toUpperCase() || "0";
  }

  // reset counters
  rightSpots = 0;
  rightLetters = 0;

  // temporary arrys to mark counter letters
  const tempSecret: string[] = [...sequence];
  const tempGuess: string[] = [...guess];

  // arrays for feedback displayment
  const rightSpotsArray: string[] = new Array(SEQ_LENGTH).fill("");
  const rightLetterssArray: string[] = new Array(SEQ_LENGTH).fill("");

  // 1: count letters in right spots
  for (let counter = 0; counter < SEQ_LENGTH; counter++) {
    if (tempGuess[counter] == tempSecret[counter]) {
      rightSpots++;
      rightSpotsArray[counter] = tempGuess[counter]; // mark green letter
      tempGuess[counter] = "";
      tempSecret[counter] = "";       // mark counter
    }
  }

  // 2: count correct letters, but not in correct spot
  for (let counter = 0; counter < SEQ_LENGTH; counter++) {
    if (tempGuess[counter] !== "") {
      const index = tempSecret.indexOf(tempGuess[counter]);
      if (index !== -1) {
        rightLetters++;
        rightLetterssArray[counter] = guess[counter];
        tempSecret[index] = "";
        tempGuess[counter] = "";
      }
    }
  }

  numberOfTries++;

  // decision
  if (rightSpots == SEQ_LENGTH) {
    console.log(`CONGRATULATIONS! You guessed the correct sequence: 
    ${sequence.join("")}`);
    break;
  } else {
    console.log(`Letters in correct position (green): 
    ${JSON.stringify(rightSpotsArray)}`);
    console.log(`Correct letters in wrong position (orange): 
    ${JSON.stringify(rightLetterssArray)}`);
    console.log(`You have ${MAX_GUESS - numberOfTries} guesses left.\n`);
  }

  if (numberOfTries >= MAX_GUESS) {
    console.log(`Sorry, you've run out of guesses, the sequence was 
    ${sequence.join("")}`);
    break;
  }
} while (true);

console.log("\nGame Over.");

console.log("\nDone.")
