import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";
export declare const prismaClient: PrismaClient<{
    adapter: PrismaPg;
    log: "query"[];
}, "query", import("@prisma/client/runtime/client").DefaultArgs>;
//# sourceMappingURL=index.d.ts.map