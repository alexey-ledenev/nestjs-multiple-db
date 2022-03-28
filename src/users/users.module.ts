import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.admin-entity';
import { DATABASE } from '../app.types';

@Module({
  imports: [TypeOrmModule.forFeature([User], DATABASE.ADMIN)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
