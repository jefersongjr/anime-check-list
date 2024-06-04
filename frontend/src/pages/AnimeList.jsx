import { useState } from 'react';
import animesData from '../db/animes';
import '../style/AnimeList.css';

function AnimeList() {
  const [onEdit, setOnEdit] = useState(null);
  const [animes, setAnimes] = useState(animesData);

  const handleCheckboxClick = (animeId) => {
    console.log(animeId);
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
              className={
                anime.status === 'Em lançamento' ? 'redBackground' : 'grayBackground'
              }
            >
              <td>
                <input
                  type="checkbox"
                  onClick={ () => handleCheckboxClick(anime.id) }
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
                {' '}
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
                {' '}
                {onEdit === anime.id ? (
                  <select
                    type="number"
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
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default AnimeList;
