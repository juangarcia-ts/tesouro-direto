export const handleFormValidation = errorObj =>
  Object.keys(errorObj).map(e => errorObj[e].message);
