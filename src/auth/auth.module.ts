import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';

@Module({
    imports: [UserModule, PassportModule],
    providers: [AuthService, LocalStrategy],
    controllers: [AuthController],
})
export class AuthenticationModule { }