'use client'

import { useState } from 'react'
import { Button } from '@repo/ui/button'
import { Input } from '@repo/ui/input'
import type { GuessingGameEngineProps } from './page'

export default function RandomNumberGame({ randomNumber, endGame, maxGuessCount }: GuessingGameEngineProps) {
  const [guessCount, setGuessCount] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [guess, setGuess] = useState(0)
  const [hasWon, setHasWon] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  function submitGuess(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const newGuessCount = guessCount + 1

    if (guess < randomNumber) {
      setFeedback('Higher!')
    } else if (guess > randomNumber) {
      setFeedback('Lower!')
    } else {
      setFeedback(`You won in ${newGuessCount} guesses!`)
      setHasWon(true)
      setGameOver(true)
    }

    if (newGuessCount >= maxGuessCount && guess !== randomNumber) {
      setFeedback(`You lose! The correct number was ${randomNumber}.`)
      setGameOver(true)
    }

    setGuessCount(newGuessCount)
  }

  function onSubmitEndGame(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setGuessCount(0)
    setFeedback('')
    setGuess(0)
    setHasWon(false)
    setGameOver(false)
    endGame()
  }

  const backgroundClass = hasWon ? 'bg-green-100' : gameOver ? 'bg-red-200' : ''

  return (
    <div className={`${backgroundClass} p-10 rounded-md transition-colors`}>
      {gameOver ? (
        <form className="flex flex-col gap-4" onSubmit={onSubmitEndGame}>
          <div>{feedback}</div>
          <Button type="submit">Play Again</Button>
        </form>
      ) : (
        <form className="flex flex-col gap-4" onSubmit={submitGuess}>
          <Input
            name="guess"
            id="guess"
            type="number"
            placeholder="Enter your guess"
            value={guess}
            setValue={(newValue) => setGuess(Number(newValue))}
          />

          <div>{feedback}</div>
          <div>You have guessed {guessCount} times</div>
          <div>You have {maxGuessCount - guessCount} guesses left</div>

          <Button type="submit">Submit Guess</Button>
        </form>
      )}
    </div>
  )
}
