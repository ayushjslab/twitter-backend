import JWT from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
class JWTService {
    static async generateTokenForUser(user) {
        const payload = {
            id: user?.id,
            email: user?.email
        };
        const token = JWT.sign(payload, JWT_SECRET);
        return token;
    }
    static decodeToken(token) {
        if (!token || token.trim() === '')
            return null;
        try {
            const cleanToken = token.replace(/^Bearer\s+/i, '').trim();
            if (cleanToken.split('.').length !== 3) {
                console.log('Invalid token format');
                return null;
            }
            const user = JWT.verify(cleanToken, JWT_SECRET);
            return user;
        }
        catch (error) {
            console.log('JWT decode error:', error);
            return null;
        }
    }
}
export default JWTService;
//# sourceMappingURL=jwt.js.map