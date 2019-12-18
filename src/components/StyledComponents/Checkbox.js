import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ButtonContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  &:hover {
    cursor: pointer
  }
`

const CorrectCheckmark = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const StyledCheckbox = styled.div`
  margin: 2px
  display: flex
  border-radius: 50%;
  border: 1px solid black
  background: ${props => (props.checked ? '#6699ff' : '')}
  transition: background 175ms;
`

function Checkbox({ className, checked, onChange, size, ...props }) {
  return (
    <ButtonContainer className={className}>
      <CorrectCheckmark defaultChecked={checked} onChange={onChange} />
      <StyledCheckbox checked={checked}>
        <ion-icon
          name="checkmark"
          size={size}
        />
      </StyledCheckbox>
    </ButtonContainer>
  )
}

Checkbox.defaultProps = {
  className: '',
  size: 'large',
}

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.number,
}

export default Checkbox
