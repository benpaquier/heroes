import styled from "styled-components"

const Button = styled.button`
  background: ${props => props.background};
  padding: 10px 20px;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 5px;
`

export default Button