import { useState } from 'react';
import animesData from '../db/animes';
import '../style/AnimeList.css';

function AnimeList() {
  const [onEdit, setOnEdit] = useState();
  const [animes, setAnimes] = useState(animesData);

  const handleCheckboxClick = (animeId) => {
    console.log(animeId);
  };

  const handleEdit = () => {
    setOnEdit(!onEdit);
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
            <th>Ultimo Episódios</th>
            <th>Espisódios Assistidos</th>
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
                {' '}
                {onEdit ? <input
                  type="number"
                  name="watchedEpisodes"
                  value={ anime.watchedEpisodes }
                  onChange={ (e) => handleChange(e, anime.id) }
                />
                  : anime.watchedEpisodes }
              </td>
              <td>{anime.lastEpisode}</td>
              <td>{anime.status}</td>
              <td>
                <button
                  type="button"
                  onClick={ handleEdit }
                  onChange={ handleChange }
                >
                  {onEdit == anime.id? "Salvar" : "Editar"}
                </button>
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
