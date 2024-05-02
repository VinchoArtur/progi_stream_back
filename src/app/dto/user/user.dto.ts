export class UserDTO {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  isActive: boolean;
}

export class UserCredentialDTO {
  userEmail: string;
  password: string;
}