import React, { useState, useEffect } from 'react'
import { socket } from '../../../socket'
import ConnectionState from './ConnectionState'
import ConnectionManager from './ConnectionManager'
import MyForm from './MyForm'
import ChatMessages from './ChatMessages'

const ChatApp: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected)

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true)
    }

    const onDisconnect = () => {
      setIsConnected(false)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  return (
    <div>
      <ConnectionState isConnected={isConnected} />
      <ConnectionManager />
      <ChatMessages />
      <MyForm />
    </div>
  )
}

export default ChatApp
