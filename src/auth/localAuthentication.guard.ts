import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * 아래에서는 Guards 를 사용 합니다. 
Guard는 경로 핸들러가 요청을 처리하는지 여부를 결정하는 역할을 합니다. 
본질적으로 Express.js 미들웨어와 유사 하지만 더 강력합니다.
 */
@Injectable()
export class LocalAuthenticationGuard extends AuthGuard('local') { }