import jwt from 'jsonwebtoken'
import fs from 'node:fs'

import 'dotenv/config'

const publicKey = process.env.PUBLIC_KEY
const token = fs.readFileSync('token.txt', 'utf8')

try {
  const result = jwt.verify(token, publicKey, {
    algorithms: [process.env.ALGORITHM],
    audience: process.env.AUD,
    issuer: process.env.ISS,
    clockTolerance: 5,
  })

  console.log('Verified payload:', result)
} catch (e) {
  console.error('JWT verification failed:', e.message)
}
