import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { db } from "@/lib/db"; // your drizzle instance
import * as schema from "./db/schema";

export const auth = betterAuth({
    emailAndPassword : {
        enabled: true
    },
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite",
        schema,
    }),
});