/**
 * 해당 이메일을 가진 사용자가 이미 존재하는 경우 usersService.create 메소드에서 오류가 발생
 * unique_violation의 코드는 23505로 지정
 */
enum PostgresErrorCode {
    UniqueViolation = '23505'
}