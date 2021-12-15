import styled from 'styled-components'

const Img = styled.div`
  height: ${props => props.height};
  background-image: url('${props => props.backgroundImage}');
  background-position: center;
  background-size: cover;
`

export default Img
