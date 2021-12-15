import Modal from 'react-modal'
import Button from '../Button'
import UpdateHeroForm from './UpdateHeroForm'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

const UpdateHeroModal = ({ isOpen, onClose, hero }) => {
  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
    >
      <h2>Mettre a jour le héro</h2>
      <UpdateHeroForm
        onClose={onClose}
        hero={hero}
      />
      <Button background="red" onClick={onClose}>
        Annuler
      </Button>
    </Modal>
  )
}

export default UpdateHeroModal