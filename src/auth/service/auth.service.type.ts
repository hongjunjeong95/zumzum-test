export type SignUpParam = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignInParam = {
  email: string;
  password: string;
};
