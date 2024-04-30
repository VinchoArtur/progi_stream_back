import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './app/modules/user/user.module';
import { db_config } from './configuration/db_mysql';
import { DatabaseModule } from './app/modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './validation/env.validation';

@Module({
  imports: [TypeOrmModule.forRoot(db_config),
    UserModule, DatabaseModule,
    ConfigModule.forRoot({
      validate
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
