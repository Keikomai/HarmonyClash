import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

dotenv.config()
const PORT = process.env.PORT

app.use(express.static('public'))
app.use(helmet())
app.use(cors())
app.use(express.json())

io.on('connection', (socket) => {
  console.log('User connected')
  socket.on('message', (message) => {
    io.emit('message', message)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

function startApp() {
  try {
    server.listen(PORT, () => console.log('Server started', PORT, 'port'))
  } catch (error) {
    console.log('error')
  }
}

startApp()
