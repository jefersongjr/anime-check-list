function AnimeTable({
  selectedAnimes,
  handleCheckboxClick,
  handleSave,
  handleEdit,
  handleDelete,
  applyBackgroundColor,
  animes,
  onEdit,
  handleChange,
}) {
  return (
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
  );
}

export default AnimeTable;