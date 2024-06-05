import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import '../style/Modal.css';

function SelectModal({ animes,
  isModalOpen, closeModal, handleMarkAsWatched, selectedAnimes }) {
  return (
    <Modal
      className="modal"
      isOpen={ isModalOpen }
      onRequestClose={ closeModal }
      contentLabel="Animes Assistidos"
    >
      <h2>Animes Selecionados</h2>
      <ul>
        {animes.filter((anime) => selectedAnimes.includes(anime.id)).map((anime) => (
          <li key={ anime.id }>{anime.name}</li>
        ))}
      </ul>
      <button
        className="button-green"
        onClick={ handleMarkAsWatched }
      >
        Marcar como Assistidos
      </button>
      <button
        className="button-purple"
        onClick={ closeModal }
      >
        Fechar
      </button>
    </Modal>
  );
}

SelectModal.propTypes = {
  animes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  handleMarkAsWatched: PropTypes.func.isRequired,
  selectedAnimes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default SelectModal;
