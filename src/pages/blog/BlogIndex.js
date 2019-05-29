import React, { Component } from "react";
import Slider from "react-slick";
import { Redirect } from "react-router-dom";
import { Loading } from "../../components";
import { PostService } from "./../../services";
import { format } from "date-fns";
import * as css from "./Styled";

class BlogIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      highlights: [],
      postsList: [],
      sliderSettings: {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 6000,
        cssEase: "linear"
      }
    };
  }

  componentDidMount() {
    this.getPostsList();
  }

  openPost(redirectId) {
    this.setState({ redirectId });
  }

  getPostsList() {
    PostService.listarPostagens().then(response => {
      const postsList = response.data;
      let highlights = [];

      if (postsList.length > 0) {
        highlights = postsList.filter(post => {
          if (post.destaque) {
            return post;
          }

          return null;
        });
      }

      this.setState({ postsList, highlights, isLoading: false });
    });
  }

  renderHighlights() {
    const { highlights } = this.state;

    return highlights.map((highlight, index) => {
      return (
        <css.HighlightWrapper key={index}>
          <css.HighlightImage
            src={highlight.imagem_capa}
            alt={highlight.titulo}
          />
          <css.HighlightTitle
            onClick={() => this.openPost(highlight.id)}
          >
            {highlight.titulo}
          </css.HighlightTitle>
        </css.HighlightWrapper>
      );
    });
  }

  renderPosts() {
    const { postsList } = this.state;

    return postsList.map((post, index) => {
      return (
        <css.PostBox key={index}>
          <css.PostBoxTitle>{post.titulo}</css.PostBoxTitle>
          <css.PostDate>
            Por: Meu Tesouro | Publicado em:{" "}
            {format(post.data_inclusao, "DD/MM/YYYY HH:mm")}
          </css.PostDate>
          <css.Row className="row">
            <css.Col className="col-xs-12 col-md-5">
              <css.PostImage
                src={post.imagem_capa}
                alt={post.titulo}
                onClick={() => this.openPost(post.id)}
              />
            </css.Col>
            <css.Col className="col-xs-12 col-md-7">
              <css.PostSummary>{post.resumo}</css.PostSummary>
              <css.TextRight className="text-right">
                <css.PostLink
                  onClick={() => this.openPost(post.id)}
                >
                  Leia mais...
                </css.PostLink>
              </css.TextRight>
            </css.Col>
          </css.Row>
        </css.PostBox>
      );
    });
  }

  render() {
    const {
      isLoading,
      highlights,
      postsList,
      redirectId,
      sliderSettings
    } = this.state;

    if (redirectId) {
      return <Redirect to={`/blog/${redirectId}`} />;
    }

    if (isLoading) {
      return <Loading />;
    }

    return (
      <css.Container className="container">
        {postsList ? (
          <>
            {highlights && highlights.length > 1 && (
              <Slider {...sliderSettings}>{this.renderHighlights()}</Slider>
            )}
            {postsList.length > 0 && this.renderPosts()}
          </>
        ) : (
          <css.Paragraph>Não há nenhuma publicação cadastrada.</css.Paragraph>
        )}
      </css.Container>
    );
  }
}

export default BlogIndex;
