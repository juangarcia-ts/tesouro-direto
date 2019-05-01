import api from "./BaseService";

const PostService = {
  listarPostagens: () => api.get(`/listarpostagens`),
  obterPostagem: id => api.get(`/obterpostagem/${id}`),
  adicionarPostagem: data => api.post("/adicionarpostagem", data),
  editarPostagem: data => api.post("/editarpostagem", data),
  removerPostagem: id => api.post("/removerpostagem", id)
};

export default PostService;
