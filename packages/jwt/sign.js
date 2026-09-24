import fs from 'node:fs'
import jwt from 'jsonwebtoken'

import 'dotenv/config'

const privateKey = process.env.PRIVATE_KEY
const payload = JSON.parse(process.env.JWT_PAYLOAD)

const token = jwt.sign(payload, privateKey, {
  algorithm: process.env.ALGORITHM,
  expiresIn: process.env.EXPIRATION,
  audience: process.env.AUD,
  issuer: process.env.ISS,
  header: { typ: 'JWT' },
})

fs.writeFileSync('token.txt', token)

console.log('Signed token written to token.txt')
