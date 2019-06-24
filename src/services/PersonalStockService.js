import api from "./BaseService";

const PersonalStockService = {
  obterTitulosPessoais: userId => api.get(`/titulopessoal/${userId}`),
  obterTituloPessoal: (userId, stockId) =>
    api.get(`/titulopessoal/${userId}/${stockId}`),
  adicionarTituloPessoal: data => api.post(`/titulopessoal`, data),
  editarTituloPessoal: (stockId, data) =>
    api.put(`/titulopessoal/${stockId}`, data),
  removerTituloPessoal: stockId => api.delete(`/titulopessoal/${stockId}`)
};

export default PersonalStockService;
