import api from "./BaseService";

const CrawlerService = {
  obterTitulosAtualizados: () => api.get(`/obtertitulosatualizados`),
  obterHistorico: params => api.post(`/obterhistorico`, params)
};

export default CrawlerService;
