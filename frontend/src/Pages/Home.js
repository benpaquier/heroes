import { useContext, useEffect, useState } from "react"
import styled from 'styled-components'
import { Link } from "react-router-dom"

import { HeroContext } from "../contexts/Hero"
import Container from "../Components/Container"
import { Grid, GridItem } from "../Components/Grid"
import HeroCard from "../Components/Home/HeroCard"


const Home = () => {
  const { getHeroes } = useContext(HeroContext)
  const [heroes, setHeroes] = useState([])

  useEffect(() => {
    getHeroes()
      .then(response => setHeroes(response))
  }, [])

  return (
    <Container>
      <h1>SuperHeroes</h1>
      <Grid>
        {heroes.map(hero => (
          <GridItem key={hero.slug}>
            <Link to={`/heroes/${hero.slug}`}>
              <HeroCard hero={hero} />
            </Link>
          </GridItem>
        ))}
      </Grid>
    </Container>
  )
}

export default Home
