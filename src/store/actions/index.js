import * as TYPES from "./actionTypes";

export const setAdminRight = isAdmin => ({
  type: TYPES.SET_ADMIN_RIGHT,
  payload: isAdmin
});
