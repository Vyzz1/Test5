export const signUP = (fullname, email, password) => {
  return {
    type: "SIGN_UP",
    fullname: fullname,
    email: email,
    password: password,
  };
};
