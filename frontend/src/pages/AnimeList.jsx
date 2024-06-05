import { useState, useEffect } from 'react';
import '../style/AnimeList.css';
import { getData, editData, deleteData } from '../utils/request';
import AnimeTable from '../components/AnimeTable';
import ResetModal from '../components/ResetModal';
import SelectModal from '../components/SelectModal';

function AnimeList() {
  const [onEdit, setOnEdit] = useState(null);
  const [animes, setAnimes] = useState([]);
  const [selectedAnimes, setSelectedAnimes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStartWeekModalOpen, setIsStartWeekModalOpen] = useState(false);
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

  const openStartWeekModal = () => {
    setIsStartWeekModalOpen(true);
  };

  const closeStartWeekModal = () => {
    setIsStartWeekModalOpen(false);
  };

  const handleStartWeek = async () => {
    try {
      const inProgressAnimes = animes.filter((anime) => anime.status === 'Em lançamento');
      await Promise.all(
        inProgressAnimes.map(async (anime) => {
          await editData('/animes', anime.id, { ...anime, watchedAt: false });
        }),
      );

      const { data } = await getData('/animes');
      setAnimeData(data);
      setIsStartWeekModalOpen(false);
    } catch (error) {
      console.error('Error starting a new week:', error);
    }
  };

  const handleMarkAsWatched = async () => {
    try {
      await Promise.all(
        selectedAnimes.map(async (animeId) => {
          await editData(
            '/animes',
            animeId,
            { ...animes.find((anime) => anime.id === animeId), watchedAt: true },
          );
        }),
      );

      const { data } = await getData('/animes');
      setAnimeData(data);
      setIsModalOpen(false);
      setSelectedAnimes([]);
    } catch (error) {
      console.error('Error marking animes as watched:', error);
    }
  };

  const applyBackgroundColor = (anime) => {
    if (anime.watchedAt) {
      return 'greenBackground';
    }
    return anime.status === 'Em lançamento' ? 'redBackground' : 'grayBackground';
  };

  return (
    <section className="main-section">
      <AnimeTable
        selectedAnimes={ selectedAnimes }
        animes={ animes }
        handleCheckboxClick={ handleCheckboxClick }
        handleSave={ handleSave }
        handleEdit={ handleEdit }
        handleDelete={ handleDelete }
        applyBackgroundColor={ applyBackgroundColor }
        onEdit={ onEdit }
        handleChange={ handleChange }
      />
      <button onClick={ openModal }>
        Assistidos
      </button>
      <button onClick={ openStartWeekModal }>
        Iniciar Nova Semana
      </button>
      <ResetModal
        isStartWeekModalOpen={ isStartWeekModalOpen }
        closeStartWeekModal={ closeStartWeekModal }
        handleStartWeek={ handleStartWeek }
      />
      <SelectModal
        animes={ animes }
        isModalOpen={ isModalOpen }
        closeModal={ closeModal }
        handleMarkAsWatched={ handleMarkAsWatched }
        selectedAnimes={ selectedAnimes }
      />
    </section>
  );
}

export default AnimeList;
