import { Controller, Get, Post, Body, Patch, Param, Delete,Query, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,private config: ConfigService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {

    if(!createUserDto.firstName || !createUserDto.lastName || !createUserDto.email || !createUserDto.password) {
      throw new HttpException('Incomplete values', HttpStatus.BAD_REQUEST);
    }

    const user = await this.usersService.create(createUserDto);
    return {status: 'success', data: user};
    
  }

  @Get()
  async findAll(@Query("limit") limit: number) {
    const user = await this.usersService.findAll(limit);
    return {status: 'success', data: user};
  }

  @Get(':id')
  findOne(@Param('id') id: string) {

    if(isNaN(+id)) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const user = this.usersService.findOne(+id);
    return {status: 'success', data: user};

  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const message = await this.usersService.update(id, updateUserDto);
    return {status: 'success', message};
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const message = await this.usersService.remove(id);
    return {status: 'success', message};
  }
}
