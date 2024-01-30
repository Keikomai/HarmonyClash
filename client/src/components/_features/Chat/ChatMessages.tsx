// ChatMessages.tsx
import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { socket } from '../../../socket'
import { ChatHistory } from './types'

interface MessageProps {
  chat: ChatHistory
}

const Message: React.FC<MessageProps> = ({ chat }) => {
  const formattedDate = new Date(chat.timestamp).toLocaleString()

  return (
    <MessageContainer>
      <Author>{chat.author}</Author>
      <MessageContent>{chat.message}</MessageContent>
      <Timestamp>{formattedDate}</Timestamp>
    </MessageContainer>
  )
}

const ChatMessages: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([])

  useEffect(() => {
    const updateChatHistory = (chats: ChatHistory[]) => {
      setChatHistory(chats)
    }

    socket.on('user/allMessages', updateChatHistory)

    return () => {
      socket.off('user/allMessages', updateChatHistory)
    }
  }, [])

  return (
    <Root>
      {chatHistory.map((chat) => (
        <Message key={chat.timestamp} chat={chat} />
      ))}
    </Root>
  )
}

const Root = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const MessageContainer = styled('div')`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const Author = styled('p')`
  font-weight: bold;
  margin-bottom: 5px;
`

const MessageContent = styled('p')`
  margin-bottom: 5px;
`

const Timestamp = styled('p')`
  font-size: 0.8em;
  color: #666;
`

export default ChatMessages
