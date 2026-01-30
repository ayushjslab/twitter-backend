import type { User } from "@prisma/client";
import JWT from "jsonwebtoken"
import type { JWTUser } from "../interfaces.js";
const JWT_SECRET = process.env.JWT_SECRET!;
class JWTService {
    public static async generateTokenForUser(user: User) {
        const payload: JWTUser = {
            id: user?.id,
            email: user?.email
        }

        const token = JWT.sign(payload, JWT_SECRET)
        return token;
    }
public static decodeToken(token: string): JWTUser | null {
    if (!token || token.trim() === '') return null;

    try {
        const cleanToken = token.replace(/^Bearer\s+/i, '').trim();
        
        if (cleanToken.split('.').length !== 3) {
            console.log('Invalid token format');
            return null;
        }

        const user = JWT.verify(cleanToken, JWT_SECRET) as JWTUser;
        return user;
    } catch (error) {
        console.log('JWT decode error:', error);
        return null;
    }
}

}

export default JWTService;