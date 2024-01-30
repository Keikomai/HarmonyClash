type ConnectionStateProps = {
  isConnected: boolean
}

const ConnectionState = ({ isConnected = false }: ConnectionStateProps) => {
  return <p>{isConnected ? 'Connected' : ' Disconnected'}</p>
}

export default ConnectionState
