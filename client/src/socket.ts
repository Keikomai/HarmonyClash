import { io } from 'socket.io-client'
import { BASE_URL } from './constants/constant'

export const socket = io(BASE_URL, {
  autoConnect: false,
})
