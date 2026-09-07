'use client'

import { useState } from 'react'
import { Button } from '@repo/ui/button'
import { Input } from '@repo/ui/input'
import type { GuessingGameMenuProps } from './page'

export default function RandomNumberGameMenu({ startGame }: GuessingGameMenuProps) {
  const [showSettings, setShowSettings] = useState(false)

  function onSubmitSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const data = new FormData(e.currentTarget)
    const min = Number(data.get('min'))
    const max = Number(data.get('max'))
    const maxGuessCount = Number(data.get('maxGuessCount'))

    startGame({ min, max, maxGuessCount })
    setShowSettings(false)
  }

  return (
    <div className="flex flex-col gap-4">
      {showSettings ? (
        <div className="flex flex-col gap-4">
          <header>
            <h1 className="text-2xl font-bold">Please enter the minimum and maximum guess values</h1>
          </header>

          <form className="flex flex-col gap-4" onSubmit={onSubmitSettings}>
            <label className="flex flex-col gap-1">
              <span>Minimum value</span>
              <Input defaultValue={0} type="number" placeholder="Minimum guessing value" name="min" id="min" />
            </label>

            <label className="flex flex-col gap-1">
              <span>Maximum value</span>
              <Input defaultValue={10} type="number" placeholder="Maximum guessing value" name="max" id="max" />
            </label>

            <label className="flex flex-col gap-1">
              <span>Maximum guesses</span>
              <Input
                defaultValue={3}
                type="number"
                placeholder="Allotted guesses"
                name="maxGuessCount"
                id="maxGuessCount"
              />
            </label>

            <Button type="submit">Submit</Button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <header className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Welcome to the Random Number Guessing Game</h1>
            <p>Pick your range, choose how many guesses you want, and try your luck.</p>
            <p>Are you ready to play?</p>
          </header>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              setShowSettings(true)
            }}
          >
            <Button type="submit">Get Started</Button>
          </form>
        </div>
      )}
    </div>
  )
}
