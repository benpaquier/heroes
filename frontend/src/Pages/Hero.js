import { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'

import { HeroContext } from '../contexts/Hero'
import Container from '../Components/Container'
import Img from '../Components/Img'
import { Grid, GridItem } from '../Components/Grid'
import Button from '../Components/Button'
import UpdatePowerModal from '../Components/Hero/UpdatePowerModal'
import Power from '../Components/Hero/Power'
import UpdateHeroModal from '../Components/Hero/UpdateHeroModal'

const Hero = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { getHero, deleteHero, deletePower } = useContext(HeroContext)
  const [hero, setHero] = useState(null)
  const [updatePowerModalVisible, setUpdatePowerModalVisible] = useState(false)
  const [updateHeroModalVisible, setUpdateHeroModalVisible] = useState(false)


  useEffect(() => {
    getHero(slug)
      .then(response => setHero(response))
  }, [location.pathname])

  const handleDeleteClick = () => {
    deleteHero(slug)
      .then(() => navigate("/"))
  }

  const handlePowerClick = power => {
    deletePower(slug, power)
      .then(() => {
        // quand mon api me repond "c'est bon ton hero est supprimé"
        // je vais le re get pour l'avoir a jour sur ma page
        getHero(slug)
          .then(response => setHero(response))
      })
  }

  if (!hero) {
    return <h3>Chargement...</h3>
  }

  return (
    <Container>
      <Img height="500px" backgroundImage={hero.image} />
      <Grid>
        <GridItem>
          <h1>{hero.name}</h1>
        </GridItem>
        <GridItem>
          <Button
            background="orange"
            onClick={() => setUpdateHeroModalVisible(true)}
          >
            Modifier
          </Button>
          <Button
            background="red"
            onClick={handleDeleteClick}
          >
            Supprimer
          </Button>
        </GridItem>
      </Grid>
      <Grid>
        <GridItem>
          <p>Age: {hero.age}</p>
          <p>{hero.isAlive ? 'En vie' : 'Plus dans le game'}</p>
        </GridItem>
        <GridItem>
          <p>Color: <span style={{ color: hero.color }}>{hero.color}</span></p>
          <p>
            Pouvoirs:
            {hero.power.map((power, index) => (
              <>
                <Power onClick={() => handlePowerClick(power)}>
                  {power}
                </Power>
                {/* si c'est pas le dernier pouvoir, on separe par des virgules */}
                {index !== hero.power.length - 1 && ", "}
              </>
            ))}
          </p>
          <Button
            background='teal'
            onClick={() => setUpdatePowerModalVisible(true)}
          >
            Ajouter un pouvoir
          </Button>
        </GridItem>
      </Grid>
      <UpdatePowerModal
        isOpen={updatePowerModalVisible}
        setHero={setHero}
        onClose={() => setUpdatePowerModalVisible(false)}
      />
      <UpdateHeroModal
        isOpen={updateHeroModalVisible}
        hero={hero}
        onClose={() => setUpdateHeroModalVisible(false)}
      />
    </Container>
  )
}

export default Hero;