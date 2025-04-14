import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

 async validateUser(email: string, password: string): Promise<any> {
  const user = await this.usersService.findOne(email);
  
  if (user && (await bcrypt.compare(password, user.password))) {
   
    const userDoc = user as any as { toObject: () => any };
    const { password, ...result } = userDoc.toObject();
    return result;
  }
  
  throw new UnauthorizedException('Invalid credentials');
}

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async signup(email: string, password: string) {
    return this.usersService.create(email, password);
  }
}
