import React from 'react';
import Modal from 'react-modal';

function SelectModal({ animes, isModalOpen, closeModal, handleMarkAsWatched, selectedAnimes }) {
  return (
    <Modal
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
      <button onClick={ handleMarkAsWatched }>Marcar como Assistidos</button>
      <button onClick={ closeModal }>Fechar</button>
    </Modal>
  );
}

export default SelectModal;
