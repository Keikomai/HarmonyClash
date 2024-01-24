import styled from '@emotion/styled'
import { memo } from 'react'

type SelectProps = {
  onChange: () => void
}

export default memo(function Select({ onChange }: SelectProps) {
  return (
    <>
      <StyledLabel htmlFor="fileInput" className="button">
        Choose Files
      </StyledLabel>
      <input
        type="file"
        id="fileInput"
        accept=".zip"
        multiple
        style={{ display: 'none' }}
        onChange={onChange}
      />
    </>
  )
})

const StyledLabel = styled('label')`
  background-color: #fbeee0;
  border: 2px solid #422800;
  border-radius: 30px;
  box-shadow: #422800 4px 4px 0 0;
  color: #422800;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  font-size: 18px;
  padding: 0 18px;
  line-height: 50px;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover {
    background-color: #fff;
  }

  &:active {
    box-shadow: #422800 2px 2px 0 0;
    transform: translate(2px, 2px);
  }

  @media (max-width: 767px) {
    font-size: 15px;
    padding: 0 18px;
  }
`
