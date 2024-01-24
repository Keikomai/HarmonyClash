import { memo } from 'react'
import styled from '@emotion/styled'
import { chunk, shuffle } from '../../helper/render'

type CircleProps = {
  elements: number[]
  images: Record<number, string>
}

export default memo(function Circle({ elements, images }: CircleProps) {
  const modifiedArr = chunk(shuffle(elements), 3)

  return (
    <CircleRoot>
      {modifiedArr.map((items, index) => (
        <Row key={`row-${items[index]}`}>
          {items.map((item) => (
            <ImageContainer key={item}>
              <Image src={images[item]} alt={String(item)} />
            </ImageContainer>
          ))}
        </Row>
      ))}
    </CircleRoot>
  )
})

const CircleRoot = styled('div')` 
 width: 300px;
  height: 300px;
  border: 2px solid #111;
  border-radius: 50%;
  background-color: #f5c2d5;
  color: #111;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-around;
  padding: 5px;
  margin: 5px;
  overflow: hidden;
}
`

const Row = styled('div')`
  display: flex;
  justify-content: space-around;
  align-items: center;

  &:first-child,
  &:nth-child(3n) {
    padding: 30px;
  }
`

const ImageContainer = styled('div')`
  width: 60px;
  height: 60px;
}
`
const Image = styled('img')`
  width: 100%;
  height: 100%;
`
