import { UsersService } from 'src/users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/auth/hash.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (await this.hashService.comparePassword(password, user.password)) {
      if (!user.isActive) {
        throw new HttpException('User is not active', HttpStatus.UNAUTHORIZED);
      }
      const payload = {
        email: email,
        password: password,
        tokenVersion: user.tokenVersion,
      };
      return {
        access_token: this.jwtService.sign(payload),
        userId: user.id,
        isAdmin: user.isAdmin,
      };
    } else {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }
  }

  async logout(token: string) {
    token = token.split(' ')[1];
    const payload = this.jwtService.decode(token);
    const user = await this.userService.getUser(payload.id);
    if (user.tokenVersion !== payload.tokenVersion) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    user.tokenVersion++;
    await this.userService.update(payload.id, {
      tokenVersion: user.tokenVersion,
    });
    return { message: 'Logout success' };
  }
}
