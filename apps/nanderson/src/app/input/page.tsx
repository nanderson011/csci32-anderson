'use client'

import { useState } from 'react'
import { Button } from '@repo/ui/button'
import { Input } from '@repo/ui/input'

export default function InputPage() {
  const [name, setName] = useState('')
  const [favoriteMovie, setFavoriteMovie] = useState('')
  const [favoriteGame, setFavoriteGame] = useState('')

  return (
    <main className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Profile Input Demo</h1>

      <div className="flex flex-wrap gap-6">
        <div className="flex gap-3">
          <Input id="name" name="name" placeholder="Enter your name" value={name} setValue={setName} />
          <Button onClick={() => alert(name)}>Show Name</Button>
        </div>

        <div className="flex gap-3">
          <Input
            id="favorite-movie"
            name="favoriteMovie"
            placeholder="Favorite movie"
            value={favoriteMovie}
            setValue={setFavoriteMovie}
          />
          <Button onClick={() => alert(favoriteMovie)}>Show Movie</Button>
        </div>

        <div className="flex gap-3">
          <Input
            id="favorite-game"
            name="favoriteGame"
            placeholder="Favorite game"
            value={favoriteGame}
            setValue={setFavoriteGame}
          />
          <Button onClick={() => alert(favoriteGame)}>Show Game</Button>
        </div>
      </div>
    </main>
  )
}
