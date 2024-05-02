import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

  constructor(firstName: string, lastName: string, password: string, email: string, isActive: boolean) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.email = email;
    this.isActive = isActive;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  password: string;
  @Column()
  email: string;
  @Column({default: true})
  isActive: boolean;
}