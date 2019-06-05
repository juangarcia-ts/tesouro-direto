import api from "./BaseService";

const UserService = {
  editarUsuario: params => api.post(`/editarusuario`, params),
  obterUsuario: firebase_id => api.get(`/obterusuario/${firebase_id}`)
};

export default UserService;
