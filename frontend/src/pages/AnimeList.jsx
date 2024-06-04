import { useState } from 'react';
import animesData from '../db/animes';
import '../style/AnimeList.css';

function AnimeList() {
  const [onEdit, setOnEdit] = useState(null);
  const [animes, setAnimes] = useState(animesData);
  const [selectedAnimes, setSelectedAnimes] = useState([]);

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

  const handleSave = () => {
    setOnEdit(null);
  };

  const handleChange = ({ target }, animeId) => {
    const { name, value } = target;
    setAnimes((prevAnimes) => (
      prevAnimes.map((anime) => (
        anime.id === animeId ? { ...anime, [name]: value } : anime))));
  };

  const handleDelete = (animeId) => {
    setAnimes((prevAnimes) => prevAnimes.filter((anime) => anime.id !== animeId));
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
                {anime.animeName}
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
                  <button type="button" onClick={ handleSave }>
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
      <button onClick={ handleMarkAsWatched }>
        Assistidos
      </button>
    </section>
  );
}

export default AnimeList;
