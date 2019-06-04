import api from "./BaseService";

const GenericService = {
  salvarImagem: params => api.post(`/salvarimagem`, params),
  obterImagem: firebase_id => api.get(`/obterimagem/${firebase_id}`),
  listarGrupos: () => api.get(`/listargrupos`),
  listarTipos: () => api.get(`/listartipos`)
};

export default GenericService;
