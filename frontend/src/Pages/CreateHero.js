import { useContext } from "react"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"

import { HeroContext } from "../contexts/Hero"
import Input from "../Components/Input"
import Button from "../Components/Button"
import Container from "../Components/Container"

const CreateHero = () => {
  const navigate = useNavigate()
  const { createHero } = useContext(HeroContext)

  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
      color: '',
      image: 'https://www.francetvinfo.fr/pictures/H9NnE7nXmthmC1hwAk24kOLSlq0/752x423/2021/05/06/phpj00BW6.jpg',
      isAlive: '',
      power: ''
    },
    onSubmit: values => {
      values = {
        ...values,
        power: values.power.split(',')
      }

      createHero(values)
        .then(() => navigate('/'))
    }
  })
  return (
    <Container>
      <h1>Créer un hero</h1>

      <form onSubmit={formik.handleSubmit}>
        <Input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder='name'
        />

        <Input
          type="number"
          name="age"
          value={formik.values.age}
          onChange={formik.handleChange}
          placeholder='age'
        />

        <Input
          type="text"
          name="color"
          value={formik.values.color}
          onChange={formik.handleChange}
          placeholder='color'
        />

        <label>isAlive</label>
        <Input
          type="checkbox"
          name="isAlive"
          checked={formik.values.isAlive}
          onChange={formik.handleChange}
        />

        <Input
          type="text"
          name="image"
          value={formik.values.image}
          onChange={formik.handleChange}
          placeholder='image'
        />

        <label>Séparer vos pouvoirs par une virgule (,)</label>
        <Input
          type="text"
          name="power"
          value={formik.values.power}
          onChange={formik.handleChange}
          placeholder='power'
        />

        <Button background="teal" type="submit">
          Valider
        </Button>
      </form>
    </Container>
  )
}

export default CreateHero;