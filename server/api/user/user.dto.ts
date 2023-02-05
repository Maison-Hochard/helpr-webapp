export interface createUserInput {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  avatar?: string;
  role?: number;
}

export interface updateUserInput {
  username?: string;
  firstname?: string;
  lastname?: string;
  password?: string;
  email?: string;
  avatar?: string;
  role?: number;
}