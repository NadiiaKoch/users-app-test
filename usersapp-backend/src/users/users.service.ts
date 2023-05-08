import { Injectable } from '@nestjs/common';
import { User } from 'src/types/user.model';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      firstName: 'Misha',
      lastName: 'Grinko',
      email: 'grinko@gmail.com',
      registrationDate: 1683294036609,
    },
    {
      id: 2,
      firstName: 'Sasha',
      lastName: 'Petrenko',
      email: 'petrenko@gmail.com',
      registrationDate: 1683294798061,
    },
    {
      id: 3,
      firstName: 'Mary',
      lastName: 'Key',
      email: 'mary@gmail.com',
      registrationDate: 1683294798061,
    },
    {
      id: 4,
      firstName: 'Jony',
      lastName: 'Snow',
      email: 'snow22@gmail.com',
      registrationDate: 1683294798061,
    },
    {
      id: 5,
      firstName: 'Sofia',
      lastName: 'Smith',
      email: 'smith@gmail.com',
      registrationDate: 1683294798061,
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  create(user: User): User {
    if (this.users.length) {
      const maxId = this.users.reduce((prev, current) => {
        return prev > current.id ? prev : current.id;
      }, 0);
      user.id = maxId + 1;
    } else {
      user.id = 1;
    }
    user.registrationDate = Date.now();
    this.users.push(user);
    return user;
  }

  update(id: number, updateUser: User): User {
    updateUser.id = id;
    updateUser.registrationDate = Date.now();
    this.users = this.users.map((user) => (user.id === id ? updateUser : user));
    return updateUser;
  }

  delete(id: number): number {
    this.users = this.users.filter((user) => user.id !== id);
    return id;
  }
}
