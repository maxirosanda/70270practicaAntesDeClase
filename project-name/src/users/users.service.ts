import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  private users: User[];

  constructor() {
    this.users = [];
  }
  create(createUserDto: CreateUserDto) {
    const user = {id: this.users.length + 1, ...createUserDto};
    this.users.push(user);
    return user
  }

  findAll(limit?: number) {
    if(limit) {
      return this.users.slice(0, limit);
    }
    return this.users;
  }

  findOne(id: number) {
    return this.users.find(user => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.users.find(user => user.id === id);
    if(user) {
      this.users = this.users.map(user => user.id === id ? {...user, ...updateUserDto} : user);
      return `User with id ${id} updated successfully`;
    }
    return `User with id ${id} not found`;
  }

  remove(id: number) {
     this.users = this.users.filter(user => user.id !== id);
     return `This action removes a #${id} user`;
  }
}
function Query(arg0: string): (target: UsersService, propertyKey: "findAll", parameterIndex: 0) => void {
  throw new Error('Function not implemented.');
}

