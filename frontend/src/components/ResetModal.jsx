import Modal from 'react-modal';
import PropTypes from 'prop-types';

function ResetModal({
  isStartWeekModalOpen,
  closeStartWeekModal,
  handleStartWeek,
}) {
  return (
    <Modal
      className="modal"
      isOpen={ isStartWeekModalOpen }
      onRequestClose={ closeStartWeekModal }
      contentLabel="Iniciar Nova Semana"
    >
      <h2>Deseja mesmo iniciar uma nova semana?</h2>
      <button
        className="button-purple"
        onClick={ handleStartWeek }
      >
        Sim
      </button>
      <button
        className="button-green"
        onClick={ closeStartWeekModal }
      >
        Cancelar
      </button>
    </Modal>
  );
}

ResetModal.propTypes = {
  isStartWeekModalOpen: PropTypes.bool.isRequired,
  closeStartWeekModal: PropTypes.func.isRequired,
  handleStartWeek: PropTypes.func.isRequired,
};

export default ResetModal;
