import type { User } from "@prisma/client";
import type { JWTUser } from "../interfaces.js";
declare class JWTService {
    static generateTokenForUser(user: User): Promise<string>;
    static decodeToken(token: string): JWTUser | null;
}
export default JWTService;
//# sourceMappingURL=jwt.d.ts.map