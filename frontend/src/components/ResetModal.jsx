import Modal from 'react-modal';

function ResetModal({
  isStartWeekModalOpen,
  closeStartWeekModal,
  handleStartWeek,
}) {
  return (
    <Modal
      isOpen={ isStartWeekModalOpen }
      onRequestClose={ closeStartWeekModal }
      contentLabel="Iniciar Nova Semana"
    >
      <h2>Deseja mesmo iniciar uma nova semana?</h2>
      <button onClick={ handleStartWeek }>Sim</button>
      <button onClick={ closeStartWeekModal }>Cancelar</button>
    </Modal>
  );
}

export default ResetModal;
