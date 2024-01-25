import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'

const app = express()

dotenv.config()
const PORT = process.env.PORT
