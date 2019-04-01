import * as TYPES from "../actions/actionTypes";

const initialState = false;

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.SET_ADMIN_RIGHT:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
