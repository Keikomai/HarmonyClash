import { Suspense, lazy, memo, useCallback, useState } from 'react'
import styled from '@emotion/styled'

import Button from './components/_atoms/Button'
import Select from './components/_atoms/Select'
import { getZipContents } from './helper/render'
import defaultImages from './assets/image'
import Loader from './components/_atoms/Loader/Loader'
import background from './assets/image/background.jpg'

const RandomCard = lazy(() => import('./components/_molecules/RandomCard'))

function App() {
  const [isShowCard, setIsShowCard] = useState<boolean>(false)
  const [imagePack, setImagePack] =
    useState<Record<number, string>>(defaultImages)

  const handleChose = useCallback(async () => {
    try {
      await getZipContents().then(setImagePack)
      setIsShowCard(true)
    } catch (error) {
      console.error('Error handling zip file:', error)
    }
  }, [])

  const handleBack = useCallback(() => {
    setIsShowCard(false)
  }, [])

  return (
    <Root>
      <Container>
        <Header className="header">
          Welcome to (I haven't come up with a name for this game)
        </Header>
        {isShowCard ? (
          <Suspense fallback={<Loader />}>
            <RandomCard images={imagePack} returnBack={handleBack} />
          </Suspense>
        ) : (
          <ButtonContainer>
            <Button
              onClick={() => setIsShowCard(true)}
              buttonText="Generate the cards"
            />
            <Select onChange={handleChose} />

            <Button
              disabled
              buttonText="Play game (Coming soon...)"
              onClick={() => {}}
            />
          </ButtonContainer>
        )}
      </Container>
    </Root>
  )
}

export default App

const Root = styled('div')`
  padding: 20px 10px;
  min-height: 100vh;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed; 
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  overflow: hidden;
}
`
const Container = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`

const Header = styled('h1')`
  font-size: 35px;
  color: #111;
  text-align: center;

  @media (max-width: 1023px) {
    font-size: 25px;
  }
  @media (max-width: 767px) {
    font-size: 18px;
  }
`

const ButtonContainer = styled('div')`
  display: flex;
  justify-content: center;
  gap: 20px;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`
