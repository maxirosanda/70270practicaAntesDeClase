import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserEntity } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.create(createUserDto);
    return user
  }

  async findAll(limit?: number) {

    if(limit === undefined) return await this.userModel.find();

    return await this.userModel.find().limit(limit);
  }

  findOne(id: number) {
    const user = this.userModel.findOne({_id: id});
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.userModel.findOne({_id: id});
    if(!user) {
      return 'User not found';
    }

    await this.userModel.updateOne({_id: id}, updateUserDto);
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
     const user = await this.userModel.findOne({_id: id});
     if(!user) {
        return 'User not found';
      }
     await this.userModel.deleteOne({_id: id});
     return `This action removes a #${id} user`;
  }
}

function Query(arg0: string): (target: UsersService, propertyKey: "findAll", parameterIndex: 0) => void {
  throw new Error('Function not implemented.');
}

