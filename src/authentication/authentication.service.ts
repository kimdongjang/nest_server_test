import { HttpException, HttpStatus } from '@nestjs/common';
import RegisterDto from 'src/register/createRegister.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

export class AuthenticationService {
    constructor(private readonly usersService: UserService) { }

    public async register(registrationData: RegisterDto) {
        // bcrypt 해싱 알고리즘
        const hashedPassword = await bcrypt.hash(registrationData.password, 10);
        try {
            const createdUser = await this.usersService.create({
                ...registrationData,
                password: hashedPassword,
            });
            createdUser.password = undefined;

            return createdUser;
        } catch (error) {
            if (error?.code === PostgresErrorCode.UniqueViolation) {
                throw new HttpException(
                    '사용자 이메일은 이미 존재합니다.',
                    HttpStatus.BAD_REQUEST,
                );
            }
            throw new HttpException(
                '알 수 없는 오류가 발생했습니다.',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    public async getAuthenticatedUser(email: string, plainTextPassword: string) {
        try {
            const user = await this.usersService.getByEmail(email);
            await this.verifyPassword(plainTextPassword, user.password);
            user.password = undefined;
            return user;
        } catch (error) {
            throw new HttpException('잘못된 인증 정보입니다.', HttpStatus.BAD_REQUEST);
        }
    }

    private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        const isPasswordMatching = await bcrypt.compare(
            plainTextPassword,
            hashedPassword
        );
        if (!isPasswordMatching) {
            throw new HttpException('잘못된 인증 정보입니다.', HttpStatus.BAD_REQUEST);
        }
    }
}