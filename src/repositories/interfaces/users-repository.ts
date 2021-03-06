export interface UserCreate {
  name: string;
  email: string;
  password: string;
}

export interface UserFind {
  id: string;
}

export interface findUserWithExistentEmail {
  email: string;
}

export interface SendToken {
  id: string;
  token: string;
  expiresIn: Date;
}

export interface UpdatePassword {
  id: string;
  password: string;
}

export interface UsersRepository {
  create: (data: UserCreate) => Promise<void>;
  findUserWithExistentEmail: (data: findUserWithExistentEmail) => Promise<Object | null>;
  find: (data: UserFind) => Promise<Object | null>;
  sendToken: (data: SendToken) => Promise<void>;
  updatePassword: (data: UpdatePassword) => Promise<void>;
}