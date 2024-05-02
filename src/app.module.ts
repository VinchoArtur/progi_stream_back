import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './app/modules/user/user.module';
import { db_config } from './configuration/db_mysql';
import { DatabaseModule } from './app/modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './validation/env.validation';
import { AuthModule } from './app/modules/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(db_config),
    UserModule, DatabaseModule, AuthModule,
    ConfigModule.forRoot({

    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  onModuleInit(): any {

  }
}
