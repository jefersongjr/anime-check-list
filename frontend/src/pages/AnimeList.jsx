import animes from '../db/animes';
import '../style/AnimeList.css';

function AnimeList() {
  const handleCheckboxClick = (animeId) => {
    console.log(animeId);
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
              key={anime.id}
              className={
                anime.status === 'Em lançamento' ? 'redBackground' : 'grayBackground'
              }
            >
              <td>
                <input
                  type="checkbox"
                  onClick={() => handleCheckboxClick(anime.id)}
                />
                {anime.animeName}
              </td>
              <td>{anime.watchedEpisodes}</td>
              <td>{anime.lastEpisode}</td>
              <td>{anime.status}</td>
              <td>
                <button
                  type="button"
                >
                  Editar
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
