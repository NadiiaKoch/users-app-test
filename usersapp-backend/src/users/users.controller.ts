import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/types/user.model';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() createUser): User {
    return this.usersService.create(createUser);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUser): User {
    return this.usersService.update(+id, updateUser);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.usersService.delete(+id);
  }
}
