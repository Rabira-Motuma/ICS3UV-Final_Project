/*
 * Author: Rabira Motuma
 * Version: 1.0.0
 * Date: 2026-01-28
 * Fileoverview: This program creates a sequence of letters while it is the users
 *        job to find out what that sequence is before they run out of guesses.
 */


package main


import (
  "bufio"
  "fmt"
  "math/rand"
  "os"
  "strings"
)


func main () {
  // contants
  const MAX_GUESS int = 10
  const SEQ_LENGTH int = 4
 
  // array/constant
  LETTERS := []string{"A", "B", "C", "D"}


  // variables
  var numberOfTries int = 0
  var rightSpots int = 0
  var rightLetters int = 0


    reader := bufio.NewReader(os.Stdin)


  // arrays
  sequence := make([]string, SEQ_LENGTH)
  guess := make([]string, SEQ_LENGTH)


  // sequence creation
  for counter := 0; counter < SEQ_LENGTH; counter++ {
    ranNumber := rand.Intn(len(LETTERS))
    sequence[counter] = LETTERS[ranNumber]
  }


  // intro
  fmt.Println("Welcome to the Letter Guessing Game.")
  fmt.Printf("You're goal will be to guess the %d-letter sequence only\nusing the letters: A, B, C ,D. Letters can repeat.\n", SEQ_LENGTH)
  fmt.Printf("You have %d guesses. Good Luck!\n", MAX_GUESS)


  // loops


  for numberOfTries < MAX_GUESS {
    // prompt
    fmt.Printf("Enter guess #%d: ", numberOfTries+1)
    guessString, _ := reader.ReadString('\n')
    guessString = strings.TrimSpace(guessString)
    if guessString == "" {
        guessString = "0000"
    }


    // divid guess into the array
    for counter := 0; counter < SEQ_LENGTH; counter++ {
      if counter < len(guessString) {
        guess[counter] = strings.ToUpper(string(guessString[counter]))
      } else {
          guess[counter] = "0"
      }
    }


    // puts back counter to 0
    rightSpots = 0
    rightLetters = 0


    // temporary arrys to mark counter letters
    tempSecret := make([]string, SEQ_LENGTH)
    tempGuess := make([]string, SEQ_LENGTH)
    for counter := 0; counter < SEQ_LENGTH; counter++ {
      tempSecret[counter] = sequence[counter]
      tempGuess[counter] = guess[counter]
    }


    // arrays for feedback displayment
    rightSpotsArray := make([]string, SEQ_LENGTH)
    rightLettersArray := make([]string, SEQ_LENGTH)
    for counter := 0; counter < SEQ_LENGTH; counter++ {
      rightSpotsArray[counter] = ""
      rightLettersArray[counter] = ""
    }


    // 1: count letters in right spots
    for counter := 0; counter < SEQ_LENGTH; counter++ {
      if tempGuess[counter] == tempSecret[counter] {
        rightSpots++
        rightSpotsArray[counter] = tempGuess[counter]
        tempGuess[counter] = ""
        tempSecret[counter] = ""
      }
    }


    // 2: count correct letters, but not in correct spot
    for counter := 0; counter < SEQ_LENGTH; counter++ {
      if tempGuess[counter] != "" {
        position := -1
        for i := 0; i < SEQ_LENGTH; i++ {
          if tempSecret[i] == tempGuess[counter] {
            position = i
            break
          }
        }
       
        if position != -1 {
          rightLetters++
          rightLettersArray[counter] = guess[counter]
          tempGuess[counter] = ""
          tempSecret[position] = ""
        }
      }
    }


    numberOfTries++


    // choice
    if rightSpots == SEQ_LENGTH {
      fmt.Printf("CONGRATULATIONS! You guessed the correct sequence: %s%s%s%s\n",
    sequence[0], sequence[1], sequence[2], sequence[3])
    break
    } else {
      fmt.Printf("Letters in correct position: %q\n", rightSpotsArray)
      fmt.Printf("Correct letters in wrong position: %q\n", rightLettersArray)
      fmt.Printf("You have %d guesses left.\n\n", MAX_GUESS-numberOfTries)
    }


    if numberOfTries >= MAX_GUESS {
      fmt.Printf("Sorry, you've run out of guesses, the sequence was \n %s%s%s%s\n",
    sequence[0], sequence[1], sequence[2], sequence[3])
    break
    }
  }


  fmt.Println("Game Over.")


  fmt.Println("\nDone.")
}
