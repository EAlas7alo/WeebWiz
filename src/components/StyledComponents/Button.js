import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledButton = styled.button`
  -webkit-apperance: none
  -webkit-border-image: none
  background-color: blue
  width: 100%
  color: white
  font-size: 14px
  font-weight: bold
  margin: 0px
  text-decoration: none
  padding: 0px 16px 4px
  cursor: pointer
  box-shadow: rgba(0, 0, 0, 0.25) 0px -4px inset
  color: rgb(255, 255, 255)
  text-align: center
  border-radius: 4px
  &: hover {
    
  }
`

const ButtonContents = styled.div`
  color: white
  width: 100%
  background-color: blue
  padding-top: 2px
  padding-bottom: 2px
  margin-top: auto
`

function Button({ className, onChange, children }) {
  return (
    <ButtonContents>
      <StyledButton className={className} type="button" onChange={onChange}>
        {children}
      </StyledButton>
    </ButtonContents>
  )
}

Button.propTypes = {
  className: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default Button
