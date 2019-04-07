import api from "./BaseService";

const GroupService = {
  listarGrupos: () => api.get(`/listargrupos`)
};

export default GroupService;
