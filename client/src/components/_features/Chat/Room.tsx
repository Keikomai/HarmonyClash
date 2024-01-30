import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'
import { socket } from '../../../socket'
import ChatMessages from './ChatMessages'
import MyForm from './MyForm'
import { ChatHistory } from './types'
import { getRandomUsername } from '../../../helper/helper'

const Room = () => {
  const [value, setValue] = useState<string>('')
  const [roomId, setRoomId] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([])
  const username = getRandomUsername()

  useEffect(() => {
    const updateChatHistory = (chats: ChatHistory[]) => {
      setChatHistory(chats)
    }

    socket.on('user/allMessages', updateChatHistory)

    return () => {
      socket.off('user/allMessages', updateChatHistory)
    }
  }, [])
  console.log(chatHistory, 'chatHistory')
  // const onSubmit = useCallback(
  //   (event: FormEvent<HTMLFormElement>) => {
  //     event.preventDefault()
  //     // console.log(value)
  //     // socket.emit('room/join', value, 'userNamee')
  //     // socket.on('user/joinChatSuccess', (res) => {
  //     //   const id = res.split(' ').at(-1)
  //     //   setRoomId(id)
  //     //   setStatus(res)
  //     // })
  //     socket.emit('chat/newMessage', roomId, value)
  //     setValue('')
  //   },
  //   [roomId, value],
  // )

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      console.log(username, 'name')
      socket.emit('room/join', value, username)
      socket.on('user/joinChatSuccess', (res) => {
        const id = res.split(' ').at(-1)
        setRoomId(id)
        setStatus(res)
      })
    },
    [value, username],
  )

  const createRoom = useCallback(() => {
    const roomId = ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
    socket.emit('room/create', roomId)
    setRoomId(roomId)
  }, [])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  return (
    <div>
      {roomId ? (
        <>
          <h2>{roomId}</h2>
          <h2>{status}</h2>
          <ChatMessages />
          <MyForm roomId={roomId} />
        </>
      ) : (
        <>
          <form onSubmit={onSubmit}>
            <input type="text" value={value} onChange={onChange} />
            <button type="submit">Find Room</button>
          </form>

          <button onClick={createRoom}>Create Room</button>
        </>
      )}
    </div>
  )
}

export default Room
