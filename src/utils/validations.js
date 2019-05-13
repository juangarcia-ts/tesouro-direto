export const validateAuthForm = ({
  isRegisterForm,
  email,
  password,
  passwordConfirmation
}) => {
  const warningTexts = [];

  if (!email || !password || (isRegisterForm && !passwordConfirmation)) {
    warningTexts.push("Todos os campos devem ser preenchidos.");
    return warningTexts;
  }

  if (!validateEmail(email)) {
    warningTexts.push("O e-mail inserido não é válido.");
  }

  if (password.length < 6) {
    warningTexts.push("A senha deve ter no mínimo 6 caracteres");
  }

  if (isRegisterForm && password !== passwordConfirmation) {
    warningTexts.push("Os campos de senha não coincidem.");
  }

  return warningTexts;
};

export const validateUserForm = ({
  email,
  phoneNumber,
  displayName,
  password,
  passwordConfirmation
}) => {
  const warningTexts = [];

  if (
    (password && !passwordConfirmation) ||
    (!password && passwordConfirmation)
  ) {
    warningTexts.push("Ambos os campos de senha devem ser preenchidos.");
    return warningTexts;
  }

  if (password && password.length < 6) {
    warningTexts.push("A senha deve ter no mínimo 6 caracteres");
  }

  if (password && password !== passwordConfirmation) {
    warningTexts.push("Os campos de senha não coincidem.");
  }

  return warningTexts;
};

export const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email);
};
