type UserToken = {
  email: string;
  password: string;
  fullname: string;
  phone: string;
  CPF: string;
  RG: string;
  birthDate: string;
  publicPlace: string;
  address: string;
  houseNumber: number;
  district: string;
  city: string;
  CEP: string;
  complement: string;
  plan: string;
};

declare namespace Express {
  interface Request {
    userToken?: UserToken;
  }
}
