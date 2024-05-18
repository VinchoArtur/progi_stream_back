import { User } from '../app/entities/users/user.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const db_config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'test-progi-stream-my-sql-do-user-16507776-0.c.db.ondigitalocean.com',
  port: 25060,
  username: 'doadmin',
  password: 'AVNS_5rdMIvFVWeF7PsISQlQ',
  database: 'defaultdb',
  entities: [User],
  synchronize: true,
  autoLoadEntities: true,
  logging: true,
}