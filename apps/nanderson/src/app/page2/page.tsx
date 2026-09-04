'use client'

import { useState } from 'react'
import { Button } from '@repo/ui/button'
import { Input } from '@repo/ui/input'

export default function Page2() {
  const [firstValue, setFirstValue] = useState('')
  const [secondValue, setSecondValue] = useState('')
  const [thirdValue, setThirdValue] = useState('')

  return (
    <main className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Page 2</h1>

      <div className="flex flex-wrap gap-4">
        <div className="flex gap-2">
          <Input id="first" name="first" placeholder="First value" value={firstValue} setValue={setFirstValue} />
          <Button onClick={() => alert(firstValue)}>Show Value</Button>
        </div>

        <div className="flex gap-2">
          <Input id="second" name="second" placeholder="Second value" value={secondValue} setValue={setSecondValue} />
          <Button onClick={() => alert(secondValue)}>Show Value</Button>
        </div>

        <div className="flex gap-2">
          <Input id="third" name="third" placeholder="Third value" value={thirdValue} setValue={setThirdValue} />
          <Button onClick={() => alert(thirdValue)}>Show Value</Button>
        </div>
      </div>
    </main>
  )
}
