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
const previousGuesses: string[][] = [];

//variables
let numberOfTries: number = 0;
let correctPositions: number = 0; // green
let correctLetters: number = 0; // orange

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

  // stores former guess
  previousGuesses.push([...guess]);

  // reset counters
  correctPositions = 0;
  correctLetters = 0;

  // temporary arrys to mark counter letters
  const tempSecret: string[] = [...sequence];
  const tempGuess: string[] = [...guess];

  // arrays for feedback displayment
  const correctPositionsArray: string[] = new Array(SEQ_LENGTH).fill("");
  const correctLettersArray: string[] = new Array(SEQ_LENGTH).fill("");

  // 1: count letters in correct position (green)
  for (let counter = 0; counter < SEQ_LENGTH; counter++) {
      if (tempGuess[counter] == tempSecret[counter]) {
        correctPositions++;
        correctPositionsArray[counter] = tempGuess[counter]; // mark green letter
        tempGuess[counter] = "";
        tempSecret[counter] = "";       // mark counter
    }
  }

  // 2: count correct letters, but not in correct position (orange)
  for (let counter = 0; counter < SEQ_LENGTH; counter++) {
      if (tempGuess[counter] !== "") {
        const index = tempSecret.indexOf(tempGuess[counter]);
        if (index !== -1) {
          correctLetters++;
          correctLettersArray[counter] = guess[counter];
          tempSecret[index] = "";
          tempGuess[counter] = "";
        }
      }
  }

  numberOfTries++;

  // decision
  if (correctPositions == SEQ_LENGTH) {
    console.log(`CONGRATULATIONS! You guessed the correct sequence: 
    ${sequence.join("")}`);
      break;  
  } else { 
    console.log(`Letters in correct position (green): 
    ${JSON.stringify(correctPositionsArray)}`);
    console.log(`Correct letters in wrong position (orange): 
    ${JSON.stringify(correctLettersArray)}`);
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
