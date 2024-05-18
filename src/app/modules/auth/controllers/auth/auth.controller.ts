import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserCredentialDTO, UserDTO } from '../../../../dto/user/user.dto';
import { AuthService } from '../../services/auth/auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {


  constructor(
    private readonly authService: AuthService,
  ) {
  }

  @Get()
  @UsePipes(ValidationPipe)
  async auth(@Res() res) {
    return res.status(HttpStatus.OK).json({ name: 'name' });
  }

  @Get('all')
  @UsePipes(ValidationPipe)
  async getAllUsers(@Res() res) {
    const allUsers = await this.authService.getAllUsers();
    res.json(allUsers);
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  async createUser(@Body() userDto: UserDTO, @Res() res: any) {
    const registrationStatus: Number = await this.authService.createUser(userDto);
    if (registrationStatus === 201) {
      return res.status(HttpStatus.CREATED).json({ message: 'User registered successfully', status: HttpStatus.CREATED });
    } else {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to register user', status: HttpStatus.INTERNAL_SERVER_ERROR });
    }
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async loginUser(@Body() userCredentials: UserCredentialDTO, @Res() res: Response) {
    const tokenOrError = await this.authService.login(userCredentials);
    if (tokenOrError instanceof UnauthorizedException) {
      return res.sendStatus(HttpStatus.UNAUTHORIZED);
    }
    return res.send({status: 200, token: tokenOrError});
  }


}
