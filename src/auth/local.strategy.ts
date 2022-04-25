import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import User from 'src/entities/user.entity';

// 전체 인증 프로세스를 위한 Passport Strategy 사용
// 사용자를 아이디와 비밀번호를 통해 인증하는 전략
// 전략을 구성하려면 특정 전략에 특정한 옵션을 제공해야 함
// passportStrategt class를 상속해 이를 수행
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
        });
    }
    async validate(email: string, password: string): Promise<User> {
        return this.authService.getAuthenticatedUser(email, password);
    }
}