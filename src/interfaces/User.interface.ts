export interface IUserLogin {
  email: string;
  password: string;
}
export interface IUserDTO extends IUserLogin {
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
}
