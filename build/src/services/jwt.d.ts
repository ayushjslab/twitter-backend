import type { User } from "@prisma/client";
declare class JWTService {
    static generateTokenForUser(user: User): Promise<string>;
}
export default JWTService;
//# sourceMappingURL=jwt.d.ts.map