import api from "./BaseService";

const TypeService = {
  listarTipos: () => api.get(`/listartipos`)
};

export default TypeService;
