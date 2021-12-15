import Modal from 'react-modal'
import Button from '../Button'
import UpdatePowerForm from './UpdatePowerForm'

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

const UpdatePowerModal = ({ isOpen, setHero, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
    >
      <h2>Mettre a jour les pouvoirs</h2>
      <UpdatePowerForm setHero={setHero} onClose={onClose} />
      <Button background="red" onClick={onClose}>
        Annuler
      </Button>
    </Modal>
  )
}

export default UpdatePowerModal