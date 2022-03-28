import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DATABASE } from 'src/app.types';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.admin-entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User, DATABASE.ADMIN)
    private readonly userRepository: Repository<User>,
  ) {}

  findByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }

  create(createUserDto: CreateUserDto) {
    console.log(
      `${UsersService.name} | ${this.create.name} | ${createUserDto}`,
    );
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(
      `${UsersService.name} | ${this.update.name} | ${updateUserDto}`,
    );
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
