import React, { useCallback, useState, ChangeEvent, FormEvent } from 'react'
import { socket } from '../../../socket'

type MyFormProps = {
  roomId: string
}

const MyForm: React.FC<MyFormProps> = ({ roomId }) => {
  const [value, setValue] = useState<string>('')

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      socket.emit('chat/newMessage', roomId, value)
      setValue('')
    },
    [roomId, value],
  )

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={value} onChange={onChange} />

      <button type="submit">Submit</button>
    </form>
  )
}

export default MyForm
