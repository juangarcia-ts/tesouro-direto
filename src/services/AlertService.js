import api from "./BaseService";

const AlertService = {
  obterAlertas: userId => api.get(`/obteralertas/${userId}`),
  adicionarAlerta: data => api.post(`/adicionaralerta`, data),
  removerAlerta: alertId => api.get(`/removeralerta/${alertId}`)
};

export default AlertService;
