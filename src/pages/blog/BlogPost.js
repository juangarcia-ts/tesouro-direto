import React, { Component } from "react";
import ReactDisqusComments from "react-disqus-comments";
import { Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { ShareButtonRectangle, ShareBlockStandard } from "react-custom-share";
import { FaTwitter, FaEnvelope, FaFacebook, FaLinkedin } from "react-icons/fa";
import { withRouter } from "react-router";
import { format } from "date-fns";
import { Loading } from "../../components";
import { PostService } from "./../../services";
import * as css from "./Styled";

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
      <Container>
        <css.PostWrapper>
          <css.PostTitle>{post.titulo}</css.PostTitle>
          <css.PostDate className="text-right">
            Por: Meu Tesouro | Publicado em:{" "}
            {format(new Date(post.data_inclusao), "dd/mm/yyyy")}
          </css.PostDate>
          <ShareBlockStandard {...shareProps} />
          <css.PostCover src={post.imagem_capa} alt={post.titulo} />
          <css.PostContent dangerouslySetInnerHTML={{ __html: post.html }} />
        </css.PostWrapper>
        <ReactDisqusComments
          shortname="meu-tesouro"
          identifier={post.id}
          title={post.title}
          url={window.location.href}
        />
      </Container>
    );
  }
}

export default withRouter(BlogPost);
