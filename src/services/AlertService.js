import api from "./BaseService";

const AlertService = {
  obterAlertas: userId => api.get(`/obteralertas/${userId}`),
  adicionarAlerta: data => api.post(`/adicionaralerta`, data),
  editarAlerta: data => api.post(`/editaralerta`, data),
  removerAlerta: alertId => api.get(`/removeralerta/${alertId}`)
};

export default AlertService;
