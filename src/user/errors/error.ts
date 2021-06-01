import { User } from '../entities/user.entity';

export class UserAlreadyExistsError extends Error {
  public message: string;
  public status: number;
  public ok: boolean;
  public data?: any;
  constructor(user?: User) {
    super();
    this.status = 561;
    this.message = `User with ${user?.email} already exists`;
    this.ok = false;
  }
}

export class UsernameOrPasswordIncorrect extends Error {
  public message: string;
  public status: number;
  public ok: boolean;
  public data?: any;
  constructor(user?: User) {
    super();
    this.status = 561;
    this.message = `Username Or password Incorrect`;
    this.ok = false;
  }
}
