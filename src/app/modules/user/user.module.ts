import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';
import { UserShema } from '../../shemas/user/user.shema';
import { UserSubscriber } from './subscribers/user.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([UserShema])],
  providers: [UserService, UserSubscriber],
  controllers: [UserController],

})
export class UserModule {
}
