import axios from "axios";
import { prismaClient } from "../../clients/db/index.js";
import JWTService from "../../services/jwt.js";

interface GoogleTokenPayload {
    iss?: string;               // Issuer
    azp?: string;               // Authorized party
    aud?: string;               // Audience (client ID)
    sub?: string;               // Google user ID
    email: string;
    email_verified: boolean;
    nbf?: number;               // Not before (unix timestamp)
    name?: string;
    picture?: string;
    given_name: string;
    family_name?: string;
    iat?: number;               // Issued at (unix timestamp)
    exp?: number;               // Expiry (unix timestamp)
    jti?: string;               // JWT ID
    alg?: string;
    kid?: string;               // Key ID
    typ?: string;
}

const queries = {
    verifyGoogleToken: async (parent: any, { token }: { token: string }
    ) => {
        const googleToken = token;

        const googleOauthURL = new URL('https://oauth2.googleapis.com/tokeninfo')
        googleOauthURL.searchParams.set('id_token', googleToken)

        const { data } = await axios.get<GoogleTokenPayload>(googleOauthURL.toString(), {
            responseType: "json"
        })

        const user = await prismaClient.user.findUnique({
            where: {
                email: data.email
            }
        })

        if (!user) {
            await prismaClient.user.create({
                data: {
                    email: data.email,
                    firstName: data.given_name,
                    lastName: data.family_name ?? null,
                    profileImageURL: data.picture ?? null
                }
            })
        }

        const userInDB = await prismaClient.user.findUnique({
            where: {
                email: data.email
            }
        })

        if(!userInDB) throw new Error("User not found");

        const userToken = JWTService.generateTokenForUser(userInDB);


        return userToken;
    }
}

export const resolvers = {
    queries
}