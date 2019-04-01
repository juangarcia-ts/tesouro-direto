import api from "./BaseService";

const CrawlerService = {
  obterTitulosAtualizados: () => api.get(`/obtertitulosatualizados`)
};

export default CrawlerService;
