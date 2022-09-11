interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  tel: string;
  is_establishment: boolean;
  id?: string;
  avatar?: string;
}

export { ICreateUserDTO };
