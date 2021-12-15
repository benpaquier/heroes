import { useContext } from 'react'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'

import Input from '../Input'
import Button from '../Button'
import { HeroContext } from '../../contexts/Hero'

const UpdatePowerForm = ({ setHero, onClose }) => {
  const { slug } = useParams()
  const { updatePowers } = useContext(HeroContext)

  const formik = useFormik({
    initialValues: {
      power: ''
    },
    onSubmit: (values, { resetForm }) => {
      // values => { power: "blabla" }
      updatePowers(slug, values)
        .then(response => {
          setHero(response)
          resetForm()
          onClose()
        })
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        type='text'
        value={formik.values.power}
        name="power"
        onChange={formik.handleChange}
      />
      <Button
        background="teal"
        type="submit"
        disabled={formik.values.power.length === 0}
      >
        Valider
      </Button>
    </form>
  )
}

export default UpdatePowerForm