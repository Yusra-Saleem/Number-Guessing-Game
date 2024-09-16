"use client"; // Enables client-side rendering for this component

// Importing necessary hooks and components from React and custom components
import { useState, useEffect, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Type definition for the NumberGuessingComponent's state
interface NumberGuessingState {
  gameStarted: boolean;
  gameOver: boolean;
  paused: boolean;
  targetNumber: number;
  userGuess: number | string;
  attempts: number;
}

// Defining the NumberGuessingComponent function component
export default function NumberGuessing(): JSX.Element {
  // State variables to manage the game state
  const [gameStarted, setGameStarted] = useState<boolean>(false); // Indicates if the game has started
  const [gameOver, setGameOver] = useState<boolean>(false); // Indicates if the game is over
  const [paused, setPaused] = useState<boolean>(false); // Indicates if the game is paused
  const [targetNumber, setTargetNumber] = useState<number>(0); // The number to be guessed
  const [userGuess, setUserGuess] = useState<number | string>(""); // The user's guess (can be a number or an empty string)
  const [attempts, setAttempts] = useState<number>(0); // Number of attempts made by the user

  // useEffect to generate a new target number when the game starts or resumes
  useEffect(() => {
    if (gameStarted && !paused) {
      const randomNumber: number = Math.floor(Math.random() * 10) + 1; // Generate a random number between 1 and 10
      setTargetNumber(randomNumber); // Set the target number
    }
  }, [gameStarted, paused]); // Dependencies: gameStarted and paused

  // Function to handle the start of the game
  const handleStartGame = (): void => {
    setGameStarted(true); // Start the game
    setGameOver(false); // Reset the game over state
    setAttempts(0); // Reset the attempts counter
    setPaused(false); // Ensure the game is not paused
  };

  // Function to handle pausing the game
  const handlePauseGame = (): void => {
    setPaused(true); // Pause the game
  };

  // Function to handle resuming the game
  const handleResumeGame = (): void => {
    setPaused(false); // Resume the game
  };

  // Function to handle the user's guess
  const handleGuess = (): void => {
    if (typeof userGuess === "number" && userGuess === targetNumber) {
      setGameOver(true); // If the guess is correct, end the game
    } else {
      setAttempts(attempts + 1); // Increment the attempts counter
    }
  };

  // Function to handle restarting the game
  const handleTryAgain = (): void => {
    setGameStarted(false); // Reset the game state
    setGameOver(false); // Reset the game over state
    setUserGuess(""); // Clear the user's guess
    setAttempts(0); // Reset the attempts counter
  };

  // Function to handle input change for user's guess
  const handleUserGuessChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserGuess(parseInt(e.target.value));
  };
  // JSX to render the game UI
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-teal-100 ">
      {/* Main container for the game */}
      <div className="bg-gradient-to-br from-gray-700 via-gray-800 to-black shadow-lg p-8 w-full max-w-md rounded border-4 border-purple-300">
        {/* Title of the game */}
        <h1 className="text-3xl font-bold text-center mb-2 text-purple-300">
          Number Guessing Game
        </h1>
        {/* Description of the game */}
        <p className="text-center text-orange-200 mb-4">
          Try to guess the number between 1 and 10!
        </p>
        {/* Conditional rendering: show start button if game hasn't started */}
        {!gameStarted && (
          <div className="flex justify-center mb-4">
            {/* Button to start the game */}
            <Button
              onClick={handleStartGame}
              className="bg-gradient-to-r to-purple-300 from-orange-200 hover:bg-gradient-to-r hover:from-gray-500 hover:to-slate-700 hover:text-white text-black font-bold  py-2 px-4 rounded"
            >
              Start Game
            </Button>
          </div>
        )}
        {/* Conditional rendering: show game controls if game started and not over */}
        {gameStarted && !gameOver && (
          <div>
            <div className="flex justify-center mb-4">
              {/* Input field for user's guess */}
              <Input
                type="number"
                value={userGuess}
                onChange={handleUserGuessChange}
                className="bg-gray-100 border border-purple-600  text-xl rounded py-2 px-6 w-full max-w-xs"
                placeholder="Enter your guess"
              />
              {/* Button to submit the guess */}
              <Button
                onClick={handleGuess}
                className="bg-gradient-to-r to-purple-300 from-orange-200 hover:bg-gradient-to-r hover:from-gray-500 hover:to-slate-700 hover:text-white text-black font-bold py-2 px-4 rounded ml-4"
              >
                Guess
              </Button>
            </div>
            <div className="text-center text-white">
              {/* Display number of attempts */}
              <p>Your Attempts: {attempts}</p>
            </div>
            <div className="flex justify-center mb-4">
              {/* Button to resume the game if paused */}
              {paused ? (
                <Button
                  onClick={handleResumeGame}
                  className="bg-gradient-to-r to-purple-300 from-orange-200 hover:bg-gradient-to-r hover:from-gray-500 hover:to-slate-700 hover:text-white text-black font-bold py-2 px-4 mt-6 rounded"
                >
                  Resume
                </Button>
              ) : (
                /* Button to pause the game */
                <Button
                  onClick={handlePauseGame}
                  className=" bg-gradient-to-r to-purple-300 from-orange-200 hover:bg-gradient-to-r hover:from-gray-500 hover:to-slate-700 hover:text-white text-black font-bold py-2 px-4 mt-6  rounded"
                >
                  Pause
                </Button>
              )}
            </div>

          </div>
        )}
        {/* Conditional rendering: show game over message if game is over */}
        {gameOver && (
          <div>
            <div className="text-center mb-4 text-white">
              {/* Game over message */}
              <h2 className="text-2xl font-bold text-white">Game Over!</h2>
              <p>You guessed the number in {attempts} attempts.</p>
            </div>
            <div className="flex justify-center">
              {/* Button to try the game again */}
              <Button
                onClick={handleTryAgain}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}