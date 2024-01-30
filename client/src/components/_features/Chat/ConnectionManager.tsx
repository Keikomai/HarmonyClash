import { useCallback } from 'react'
import { socket } from '../../../socket'

const ConnectionManager = () => {
  const connect = useCallback(() => {
    socket.connect()
    socket.emit('user/join', 'new User')
  }, [])

  const disconnect = useCallback(() => {
    socket.disconnect()
  }, [])

  return (
    <>
      <button onClick={connect}>Connect</button>
      <button onClick={disconnect}>Disconnect</button>
    </>
  )
}

export default ConnectionManager
