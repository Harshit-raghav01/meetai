import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { db } from "@/lib/db"; // your drizzle instance
import * as schema from "./db/schema";

export const auth = betterAuth({
    emailAndPassword : {
        enabled: true
    },
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
         }, 
    },
    account: {
	accountLinking: {
		enabled: true,
		trustedProviders: ["google", "github"] // add your providers
	}
},
    
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite",
        schema,
    }),
});