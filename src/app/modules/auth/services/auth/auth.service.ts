import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../../../../entities/users/user.entity';
import { UserCredentialDTO, UserDTO } from '../../../../dto/user/user.dto';
import { UserRepository } from '../../../../repository/user/user.repository';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {

  private SECRET_KEY: string = 'test';

  constructor(
    private readonly userRepository: UserRepository,
  ) {
  }


  async createUser(userDto: UserDTO): Promise<Number> {
    const isUserExist = await this.userRepository.isExistUserByEmail(userDto.email);
    console.log(isUserExist);
    if (isUserExist) {
      return 409;
    }
    try {
      await this.userRepository.createUser(userDto);
      return 201;
    } catch (error) {
      return 500;
    }
  }

  async login(userCredentials: UserCredentialDTO): Promise<string | UnauthorizedException> {
    const user: User = await this.userRepository.findUserByEmail(userCredentials.userEmail);
    if (!user) {
      return new UnauthorizedException('User do not exist');
    }
    const isPasswordValid: boolean = await this.userRepository.comparePassword(userCredentials.password, user.password);
    if (!isPasswordValid) {
      return new UnauthorizedException('Invalid password');
    }
    return jwt.sign({ userId: user.id }, this.SECRET_KEY, { expiresIn: '10h' });
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.getAllUsers();
  }
}
