import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import reducers from "./reducers";

const composeMiddlewares =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeMiddlewares(applyMiddleware(logger))
);
