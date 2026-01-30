import axios from "axios";
import { prismaClient } from "../../clients/db/index.js";
import JWTService from "../../services/jwt.js";
const queries = {
    verifyGoogleToken: async (parent, { token }) => {
        const googleToken = token;
        const googleOauthURL = new URL('https://oauth2.googleapis.com/tokeninfo');
        googleOauthURL.searchParams.set('id_token', googleToken);
        const { data } = await axios.get(googleOauthURL.toString(), {
            responseType: "json"
        });
        const user = await prismaClient.user.findUnique({
            where: {
                email: data.email
            }
        });
        if (!user) {
            await prismaClient.user.create({
                data: {
                    email: data.email,
                    firstName: data.given_name,
                    lastName: data.family_name ?? null,
                    profileImageURL: data.picture ?? null
                }
            });
        }
        const userInDB = await prismaClient.user.findUnique({
            where: {
                email: data.email
            }
        });
        if (!userInDB)
            throw new Error("User not found");
        const userToken = JWTService.generateTokenForUser(userInDB);
        return userToken;
    },
    getCurrentUser: async (parent, args, ctx) => {
        const id = ctx?.user?.id;
        if (!id)
            return null;
        const user = await prismaClient.user.findUnique({ where: { id } });
        return user;
    }
};
export const resolvers = {
    queries
};
//# sourceMappingURL=resolvers.js.map