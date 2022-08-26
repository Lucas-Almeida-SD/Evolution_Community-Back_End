type UserToken = {
  email: string;
  password: string;
  fullname: string;
  phone: string;
  CPF: number;
  RG: number;
  birthDate: string;
  publicPlace: string;
  address: string;
  houseNumber: number;
  district: string;
  city: string;
  CEP: number;
  complement: string;
  plan: string;
};

declare namespace Express {
  interface Request {
    userToken?: UserToken;
  }
}
