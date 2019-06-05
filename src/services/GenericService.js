import api from "./BaseService";

const GenericService = {
  listarGrupos: () => api.get(`/listargrupos`),
  listarTipos: () => api.get(`/listartipos`)
};

export default GenericService;
