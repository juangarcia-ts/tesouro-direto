import React, { Component } from "react";
import Slider from "react-slick";
import { Redirect } from "react-router-dom";
import { Loading } from "../../components";
import { PostService } from "./../../services";
import { format } from "date-fns";
import "./Blog.scss";

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
      let regular = [];

      if (postsList.length > 0) {
        highlights = postsList.filter(post => {
          if (post.destaque) {
            return post;
          }

          return null;
        });

        regular = postsList.filter(post => {
          if (!post.destaque) {
            return post;
          }

          return null;
        });
      }

      this.setState({ postsList, highlights, regular, isLoading: false });
    });
  }

  renderHighlights() {
    const { highlights } = this.state;

    return highlights.map((highlight, index) => {
      return (
        <div className="hightlight-wrapper" key={index}>
          <img
            className="hightlight-image"
            src={highlight.imagem_capa}
            alt={highlight.titulo}
          />
          <p
            className="hightlight-title"
            onClick={() => this.openPost(highlight.id)}
          >
            {highlight.titulo}
          </p>
        </div>
      );
    });
  }

  renderPosts() {
    const { regular } = this.state;

    return regular.map((post, index) => {
      return (
        <div key={index} className="post-wrapper post-box">
          <p className="post-title">{post.titulo}</p>
          <span className="post-date">
            Por: Meu Tesouro | Publicado em:{" "}
            {format(post.data_inclusao, "DD/MM/YYYY HH:mm")}
          </span>
          <div className="row">
            <div className="col-xs-12 col-md-5">
              <img
                className="post-image"
                src={post.imagem_capa}
                alt={post.titulo}
                onClick={() => this.openPost(post.id)}
              />
            </div>
            <div className="col-xs-12 col-md-7">
              <p className="post-summary">{post.resumo}</p>
              <div className="text-right">
                <span
                  className="post-link"
                  onClick={() => this.openPost(post.id)}
                >
                  Leia mais...
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    const {
      isLoading,
      highlights,
      postsList,
      regular,
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
      <div className="container">
        {postsList ? (
          <div>
            {highlights && highlights.length > 1 && (
              <Slider {...sliderSettings}>{this.renderHighlights()}</Slider>
            )}
            {regular && regular.length > 0 && this.renderPosts()}
          </div>
        ) : (
          <p>Não há nenhuma publicação cadastrada.</p>
        )}
      </div>
    );
  }
}

export default BlogIndex;
