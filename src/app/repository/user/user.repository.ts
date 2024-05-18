import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/users/user.entity';
import { Repository } from 'typeorm';
import { UserCredentialDTO, UserDTO } from '../../dto/user/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async createUser(userDto: UserDTO): Promise<Number> {
    const { firstName, lastName, email, password, isActive } = userDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = this.userRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isActive,
    });
    try {
      await this.userRepository.save(newUser);
      return 201;
    } catch (error) {
      console.log(error);
      return 500;
    }
  }

  async login(userCredentials: UserCredentialDTO): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        email: userCredentials.userEmail,
        password: userCredentials.password,
      },
    });
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async isExistUserByEmail(email: string): Promise<boolean> {
    return await this.userRepository.existsBy({ email: email });
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email: email });
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}