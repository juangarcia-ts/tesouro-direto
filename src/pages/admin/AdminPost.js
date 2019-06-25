import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { format } from "date-fns";
import { Editor } from "react-draft-wysiwyg";
import { Loading } from "../../components";
import { PostService } from "./../../services";
import { convertToBase64 } from "./../../utils/convertions";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./Admin.scss";

class AdminPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isFormVisible: false,
      postsList: [],
      postId: null,
      isPostHighlight: false,
      postTitle: "",
      postSummary: "",
      postImage: null,
      postHtml: null,
      showRequiredWarning: false,
      editorState: EditorState.createEmpty()
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleFormVisibility = this.toggleFormVisibility.bind(this);
  }

  componentDidMount() {
    this.getPostsList();
  }

  getPostsList() {
    PostService.listarPostagens().then(response => {
      const postsList = response.data;

      this.setState({ postsList, isLoading: false });
    });
  }

  toggleFormVisibility() {
    const { isFormVisible } = this.state;

    this.setState({
      isFormVisible: !isFormVisible,
      postId: null,
      isPostHighlight: false,
      postTitle: "",
      postSummary: "",
      postImage: null,
      postHtml: null,
      showRequiredWarning: false,
      editorState: EditorState.createEmpty()
    });
  }

  onEditorStateChange(editorState) {
    const content = convertToRaw(editorState.getCurrentContent());
    const postHtml = draftToHtml(content);
    this.setState({ editorState, postHtml });
  }

  handleSubmit(event) {
    event.preventDefault();

    const {
      isPostHighlight,
      postId,
      postTitle,
      postSummary,
      postImage,
      postHtml
    } = this.state;

    if (!postTitle || !postImage || !postHtml || !postSummary) {
      return this.setState({ showRequiredWarning: true });
    }

    this.setState({ isLoading: true, showRequiredWarning: false });

    convertToBase64(this.state.postImage, result => {
      const postData = {
        isPostHighlight,
        postId,
        postTitle,
        postSummary,
        postImage: result,
        postHtml
      };

      if (!postId) {
        return PostService.adicionarPostagem(postData).then(response => {
          const id = response.data;

          if (id) {
            this.toggleFormVisibility();
            this.getPostsList();
          }
        });
      }

      PostService.editarPostagem(postData).then(response => {
        const id = response.data;

        if (id) {
          this.toggleFormVisibility();
          this.getPostsList();
        }
      });
    });
  }

  editPost(post) {
    const contentBlock = htmlToDraft(post.html);

    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      this.setState({ editorState });
    }

    this.setState({
      isFormVisible: true,
      postId: post.id,
      isPostHighlight: post.destaque,
      postTitle: post.titulo,
      postSummary: post.resumo,
      postImage: post.imagem_capa,
      postHtml: post.html
    });
  }

  removePost(postId) {
    const params = {
      postId
    };

    this.setState({ isLoading: true });

    PostService.removerPostagem(params).then(() => this.getPostsList());
  }

  renderForm() {
    const {
      showRequiredWarning,
      isPostHighlight,
      postId,
      postTitle,
      postSummary,
      postImage,
      postHtml
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group highlight-checkboxes">
          <label>Destaque:</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              checked={isPostHighlight}
              onChange={e => this.setState({ isPostHighlight: true })}
            />
            <label>Sim</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              checked={!isPostHighlight}
              onChange={e => this.setState({ isPostHighlight: false })}
            />
            <label>Não</label>
          </div>
        </div>

        <div className="form-group">
          <label>Titulo:</label>
          <input
            type="text"
            className="form-control"
            value={postTitle}
            onChange={e => this.setState({ postTitle: e.target.value })}
          />
          {showRequiredWarning && !postTitle && (
            <small className="required-warning">Campo obrigatório</small>
          )}
        </div>

        <div className="form-group">
          <label>Imagem da capa:</label>
          <small className="help-block">
            Formatos aceitos: .png, .jpg ou .jpeg
          </small>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={e => this.setState({ postImage: e.target.files[0] })}
          />
          {showRequiredWarning && !postImage && (
            <small className="required-warning">Campo obrigatório</small>
          )}
        </div>

        <div className="form-group">
          <label>Resumo:</label>
          <textarea
            rows="5"
            className="form-control"
            value={postSummary}
            onChange={e => this.setState({ postSummary: e.target.value })}
          />
          {showRequiredWarning && !postSummary && (
            <small className="required-warning">Campo obrigatório</small>
          )}
        </div>

        <div>
          <label>Conteúdo:</label>
          <Editor
            editorState={this.state.editorState}
            wrapperClassName="editor-wrapper"
            editorClassName="editor-textarea"
            onEditorStateChange={this.onEditorStateChange}
          />
          {showRequiredWarning && !postHtml && (
            <small className="required-warning">Campo obrigatório</small>
          )}
        </div>

        <div className="text-right">
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.toggleFormVisibility}
          >
            Cancelar
          </button>
          <button type="submit" className="submit-btn btn btn-success">
            {postId ? "Editar" : "Adicionar"}
          </button>
        </div>
      </form>
    );
  }

  renderPosts() {
    const { postsList } = this.state;

    return postsList.map((post, index) => {
      return (
        <tr key={index}>
          <td>{post.destaque ? "Sim" : "Não"}</td>
          <td>{format(new Date(post.data_inclusao), "dd/mm/yyyy hh:mm")}</td>
          <td className="truncate-title">{post.titulo}</td>
          <td>-</td>
          <td className="text-right">
            <FaEdit
              size={"1.6em"}
              style={{ marginRight: "15px" }}
              onClick={() => this.editPost(post)}
            />
            <FaTrash
              size={"1.5em"}
              onClick={() => {
                if (window.confirm("Confirmar exclusão do item?")) {
                  this.removePost(post.id);
                }
              }}
            />
          </td>
        </tr>
      );
    });
  }

  render() {
    const { isFormVisible, isLoading, postsList } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <div className="container">
        {isFormVisible ? (
          <section className="section">
            <h3 className="section-title">Nova publicação</h3>
            {this.renderForm()}
          </section>
        ) : (
          <div>
            <section className="section">
              <h3 className="section-title">Listagem de publicações</h3>
              {postsList && postsList.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Destaque?</th>
                      <th className="nowrap">Data de Publicação</th>
                      <th>Título</th>
                      <th>Autor</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>{this.renderPosts()}</tbody>
                </table>
              ) : (
                <p>Não há nenhuma publicação cadastrada.</p>
              )}
            </section>
            <button
              type="button"
              className="floating-btn btn btn-success"
              onClick={this.toggleFormVisibility}
            >
              <FaPlus />
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default AdminPost;
