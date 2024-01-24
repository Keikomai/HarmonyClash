import styled from '@emotion/styled'
import { RenderCards } from '../../helper/render'
import Circle from './Circle'
import { memo } from 'react'
import ArrowIcon from '../Icons/ArrowIcon'

type RandomCardProps = {
  images: Record<number, string>
  returnBack: () => void
}

export default memo(function RandomCard({
  images,
  returnBack,
}: RandomCardProps) {
  const deck = RenderCards(8)

  return (
    <Root>
      <ReturnButton onClick={returnBack}>
        <ArrowIcon />
        Back
      </ReturnButton>
      <BlockContainer>
        {deck.map((elements, index) => (
          <Circle elements={elements} images={images} key={index}></Circle>
        ))}
      </BlockContainer>
    </Root>
  )
})

const Root = styled('div')`
  position: relative;
  display: flex;
  flex-direction: column;
}
`

const ReturnButton = styled('button')`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 10px;
  background-color: #3dd1e7;
  color: #000000;
  border: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px; /* Adjust the gap between the arrow icon and text */
`

const BlockContainer = styled('div')`
  display: flex;
  flex-flow: wrap;
  justify-content: center;
}
`
