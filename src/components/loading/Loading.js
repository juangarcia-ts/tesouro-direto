import React from "react";
import { ClipLoader } from "react-spinners";
import "./Loading.scss";

const Loading = () => (
  <div className="loading">
    <div className="text-center">
      <ClipLoader size={50} color={"#15787d"} />
      <p>Carregando...</p>
    </div>
  </div>
);

export default Loading;
