export interface IUserLogin {
  email: string;
  password: string;
}
export interface IUserDTO extends IUserLogin {
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
}

export interface IUserEdit {
  email?: string;
  password?: string;
  fullname?: string;
  phone?: string;
  CPF?: number;
  RG?: number;
  birthDate?: string;
  publicPlace?: string;
  address?: string;
  houseNumber?: number;
  district?: string;
  city?: string;
  CEP?: number;
  complement?: string;
  plan?: string;
}
