'use client'

import { useState } from 'react'
import { Button } from '@repo/ui/button'
import { Input } from '@repo/ui/input'
import { getRandomNumber } from '../../../lib/math'

export default function RandomNumberGuesserPage() {
  const [min, setMin] = useState('1')
  const [max, setMax] = useState('100')
  const [maxGuesses, setMaxGuesses] = useState('10')
  const [targetNumber, setTargetNumber] = useState<number | null>(null)
  const [guess, setGuess] = useState('')
  const [guessesUsed, setGuessesUsed] = useState(0)
  const [message, setMessage] = useState('')
  const [gameOver, setGameOver] = useState(false)
  const [lowBound, setLowBound] = useState(1)
  const [highBound, setHighBound] = useState(100)
  const recommendedGuess = Math.floor((lowBound + highBound) / 2)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (targetNumber === null || gameOver) {
      return
    }

    const numericGuess = Number(guess)
    const newGuessesUsed = guessesUsed + 1

    setGuessesUsed(newGuessesUsed)

    if (numericGuess === targetNumber) {
      setMessage(`Correct! The number was ${targetNumber}. Play again?`)
      setGameOver(true)
    } else if (newGuessesUsed >= Number(maxGuesses)) {
      setMessage(`You lost. The number was ${targetNumber}. Play again?`)
      setGameOver(true)
    } else if (numericGuess < targetNumber) {
      setMessage('Higher!')
      setLowBound(numericGuess + 1)
    } else {
      setMessage('Lower!')
      setHighBound(numericGuess - 1)
    }
  }
  return (
    <main className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Random Number Guesser</h1>

      <div className="flex flex-wrap gap-4">
        <Input id="min" name="min" type="number" placeholder="Minimum" value={min} setValue={setMin} />

        <Input id="max" name="max" type="number" placeholder="Maximum" value={max} setValue={setMax} />

        <Input
          id="max-guesses"
          name="maxGuesses"
          type="number"
          placeholder="Max guesses"
          value={maxGuesses}
          setValue={setMaxGuesses}
        />
      </div>

      <Button
        onClick={() => {
          const newTarget = getRandomNumber(Number(min), Number(max))

          setTargetNumber(newTarget)
          setGuess('')
          setGuessesUsed(0)
          setMessage('Game started! Enter your first guess.')
          setGameOver(false)
          setLowBound(Number(min))
          setHighBound(Number(max))
        }}
      >
        New Game
      </Button>
      {targetNumber !== null && !gameOver && (
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Input
            id="guess"
            name="guess"
            type="number"
            placeholder="Enter your guess"
            value={guess}
            setValue={setGuess}
          />

          <Button type="submit">Guess</Button>
        </form>
      )}

      {message && <p>{message}</p>}
      {targetNumber !== null && !gameOver && <p>Recommended guess: {recommendedGuess}</p>}

      {gameOver && (
        <Button
          onClick={() => {
            const newTarget = getRandomNumber(Number(min), Number(max))

            setTargetNumber(newTarget)
            setGuess('')
            setGuessesUsed(0)
            setMessage('New game started! Enter your first guess.')
            setGameOver(false)
            setLowBound(Number(min))
            setHighBound(Number(max))
          }}
        >
          Play Again
        </Button>
      )}
    </main>
  )
}
