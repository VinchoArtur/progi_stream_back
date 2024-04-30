import { EntitySchema } from 'typeorm';
import { User } from '../../entities/users/user.entity';

export const UserShema = new EntitySchema<User>({
  name: 'User',
  target: User,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }
})