import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import animesData from '../db/animes';
import '../style/AnimeList.css';
import { getData, editData, deleteData } from '../utils/request';

function AnimeList() {
  const [onEdit, setOnEdit] = useState(null);
  const [animes, setAnimes] = useState(animesData);
  const [selectedAnimes, setSelectedAnimes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animeData, setAnimeData] = useState([]);

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const { data } = await getData('/animes');
        setAnimeData(data);
      } catch (error) {
        console.error('Error fetching anime data:', error);
      }
    };
    fetchAnimeData();
  }, []);

  useEffect(() => {
    setAnimes(animeData);
  }, [animeData]);

  const handleCheckboxClick = (animeId) => {
    setSelectedAnimes((prevSelectedAnimes) => {
      if (prevSelectedAnimes.includes(animeId)) {
        return prevSelectedAnimes.filter((id) => id !== animeId);
      }
      return [...prevSelectedAnimes, animeId];
    });
  };

  const handleEdit = (animeId) => {
    setOnEdit(animeId);
  };

  const handleSave = async (animeId) => {
    try {
      const updatedAnime = animes.find((anime) => anime.id === animeId);
      await editData('/animes', animeId, updatedAnime);
      setOnEdit(null);
      const { data } = await getData('/animes');
      setAnimeData(data);
    } catch (error) {
      console.error('Error saving anime data:', error);
    }
  };

  const handleChange = ({ target }, animeId) => {
    const { name, value } = target;
    setAnimes((prevAnimes) => (
      prevAnimes.map((anime) => (
        anime.id === animeId ? { ...anime, [name]: value } : anime))));
  };

  const handleDelete = async (animeId) => {
    try {
      await deleteData('/animes', animeId);
      setAnimes((prevAnimes) => prevAnimes.filter((anime) => anime.id !== animeId));
    } catch (error) {
      console.error('Error deleting anime:', error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleMarkAsWatched = () => {
    setAnimes((prevAnimes) => (
      prevAnimes.map((anime) => (
        selectedAnimes.includes(anime.id) && anime.status === 'Em lançamento'
          ? { ...anime, status: 'Assistido' }
          : anime
      ))
    ));
    setSelectedAnimes([]);
    closeModal();
  };

  const applyBackgroundColor = (anime) => {
    if (anime.status === 'Assistido') {
      return 'greenBackground';
    }
    return anime.status === 'Em lançamento' ? 'redBackground' : 'grayBackground';
  };
  return (
    <section className="main-section">
      <table>
        <thead>
          <tr>
            <th>Anime</th>
            <th>Último Episódio</th>
            <th>Episódios Assistidos</th>
            <th>Status</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {animes && animes.map((anime) => (
            <tr
              key={ anime.id }
              className={ applyBackgroundColor(anime) }
            >
              <td>
                <input
                  type="checkbox"
                  checked={ selectedAnimes.includes(anime.id) }
                  onChange={ () => handleCheckboxClick(anime.id) }
                />
                {anime.name}
              </td>
              <td>
                {onEdit === anime.id ? (
                  <input
                    type="number"
                    name="watchedEpisodes"
                    value={ anime.watchedEpisodes }
                    onChange={ (e) => handleChange(e, anime.id) }
                  />
                ) : (
                  anime.watchedEpisodes
                )}
              </td>
              <td>
                {onEdit === anime.id ? (
                  <input
                    type="number"
                    name="lastEpisode"
                    value={ anime.lastEpisode }
                    onChange={ (e) => handleChange(e, anime.id) }
                  />
                ) : (
                  anime.lastEpisode
                )}
              </td>
              <td>
                {onEdit === anime.id ? (
                  <select
                    name="status"
                    value={ anime.status }
                    onChange={ (e) => handleChange(e, anime.id) }
                  >
                    <option value="Em lançamento">Em lançamento</option>
                    <option value="Hiato">Hiato</option>
                    <option value="Concluído">Concluído</option>
                  </select>
                ) : (
                  anime.status
                )}
              </td>
              <td>
                {onEdit === anime.id ? (
                  <button type="button" onClick={ () => handleSave(anime.id) }>
                    Salvar
                  </button>
                ) : (
                  <button type="button" onClick={ () => handleEdit(anime.id) }>
                    Editar
                  </button>
                )}
              </td>
              <td>
                <button
                  type="button"
                  onClick={ () => handleDelete(anime.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={ openModal }>
        Assistidos
      </button>
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
    </section>
  );
}

export default AnimeList;
