import styled from "styled-components"

import Img from "../Img"

const Container = styled.div`
  border: solid #333 1px;
  border-radius: 5px;
`

const Info = styled.div`
  text-align: center;
  padding: 10px 0px;
`

const HeroCard = ({ hero }) => {
  console.log(hero)

  return (
    <Container>
      <Img height="350px" backgroundImage={hero.image} />
      <Info>
        <h2>{hero.name}</h2>
      </Info>
    </Container>
  )
}

export default HeroCard