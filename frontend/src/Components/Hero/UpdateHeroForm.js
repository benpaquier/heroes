import { useContext } from 'react'
import { useFormik } from 'formik'
import { useParams, useNavigate } from 'react-router-dom'

import { HeroContext } from '../../contexts/Hero'
import Button from '../Button';
import Input from '../Input';

const UpdateHeroForm = ({ hero, onClose }) => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { updateHero } = useContext(HeroContext)

  const formik = useFormik({
    initialValues: {
      name: hero.name,
      age: hero.age,
      color: hero.color,
      image: hero.image,
      isAlive: hero.isAlive
    },
    onSubmit: (values, { resetForm }) => {
      updateHero(slug, values)
        .then(response => {
          navigate(`/heroes/${response.slug}`)
          resetForm()
          onClose()
        })
    }
  })

  return (
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

      <Button background="teal" type="submit">
        Valider
      </Button>
    </form>
  );
};

export default UpdateHeroForm;