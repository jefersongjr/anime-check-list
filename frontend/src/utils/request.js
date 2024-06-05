import axios from 'axios';

const DUZENTOS = 200;

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getData = async (url) => {
  try {
    const response = await api.get(url);
    if (response.status === DUZENTOS) return response;
    throw new Error('Erro na resposta da API');
  } catch (error) {
    console.error('Erro ao capturar os Animes:', error.message);
    throw error;
  }
};

export const editData = async (apiUrl, id, content) => {
  try {
    const response = await api.put(`${apiUrl}/${id}`, content);
    return response;
  } catch (error) {
    console.error('Erro ao editar Anime:', error.message);
  }
};

export const deleteData = async (apiUrl, id) => {
  try {
    const response = await api.delete(`${apiUrl}/${id}`);
    return response;
  } catch (error) {
    console.error('Erro ao deletar Anime:', error.message);
  }
};
