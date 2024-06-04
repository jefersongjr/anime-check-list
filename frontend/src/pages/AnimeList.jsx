import animes from '../db/animes';

function AnimeList() {
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
          { animes && animes.map((anime) => (
            <tr key={ anime.id }>
              <td>{anime.animeName}</td>
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
