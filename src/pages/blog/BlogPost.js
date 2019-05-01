import React, { Component } from "react";
import ReactDisqusComments from "react-disqus-comments";
import { Redirect } from "react-router-dom";
import { ShareButtonRectangle, ShareBlockStandard } from "react-custom-share";
import { FaTwitter, FaEnvelope, FaFacebook, FaLinkedin } from "react-icons/fa";
import { withRouter } from "react-router";
import { format } from "date-fns";
import { Loading } from "../../components";
import { PostService } from "./../../services";
import "./Blog.scss";

class BlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      post: null,
      shareProps: {
        url: window.location.href,
        button: ShareButtonRectangle,
        buttons: [
          { network: "Twitter", icon: FaTwitter },
          { network: "Facebook", icon: FaFacebook },
          {
            network: "Linkedin",
            icon: FaLinkedin,
            link:
              "https://www.linkedin.com/sharing/share-offsite/?url=https://meu-tesouro.herokuapp.com"
          },
          { network: "Email", icon: FaEnvelope }
        ],
        text: "",
        longtext: ""
      }
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    PostService.obterPostagem(id)
      .then(response => {
        const post = response.data;
        const shareProps = {
          ...this.state.shareProps,
          text: post.title,
          longtext: post.title
        };

        this.setState({ post, shareProps });
      })
      .catch(() => this.setState({ redirect: true }));
  }

  render() {
    const { redirect, post, shareProps } = this.state;

    if (redirect) {
      return <Redirect to="/pagina-nao-encontrada" />;
    }

    if (!post) {
      return <Loading />;
    }

    return (
      <div className="container">
        <div className="post-wrapper">
          <h1>{post.titulo}</h1>
          <span className="post-date text-right">
            Por: Meu Tesouro | Publicado em:{" "}
            {format(post.data_inclusao, "DD/MM/YYYY")}
          </span>
          <ShareBlockStandard {...shareProps} />
          <img
            className="post-cover"
            src={post.imagem_capa}
            alt={post.titulo}
          />
          <div
            className="post-text"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
        <ReactDisqusComments
          shortname="meu-tesouro"
          identifier={post.id}
          title={post.title}
          url={window.location.href}
        />
      </div>
    );
  }
}

export default withRouter(BlogPost);
