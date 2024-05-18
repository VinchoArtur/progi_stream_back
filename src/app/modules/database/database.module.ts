import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { dataBaseConfig } from '../../../configuration/development.configuration';

@Module({
  imports: [ConfigModule.forFeature(dataBaseConfig)]
})
export class DatabaseModule {}
