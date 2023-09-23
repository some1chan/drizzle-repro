import "dotenv/config";

import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { DefaultLogger, SQL, sql } from "drizzle-orm";

const client = postgres({
	hostname: process.env.POSTGRES_HOST,
	database: process.env.POSTGRES_DB,
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	port: process.env.POSTGRES_PORT ? Number(process.env.POSTGRES_PORT) : 5432,
});
const db = drizzle(client, { logger: new DefaultLogger() });
const pollHexId = "018abb841f4ae4257adbba232b34f848";
const userId = "018abb841f4ae4257adbba232b34f848";
const choiceIds = [
	"018abb841f4ae4257adbba232b34f848",
	"018abb841f4ae4257adbba232b34f848",
];

const sqlQuery =
	sql`SELECT public.insert_vote(${pollHexId}::uuid, ${userId}::uuid, `.inlineParams();

const sanitizedChoiceIds: SQL<unknown>[] = [sql.raw("{")];
const rawChoiceIds: SQL<unknown>[] = [];
for (const choiceId of choiceIds) {
	rawChoiceIds.push(sql`${choiceId}`);
}
sanitizedChoiceIds.push(sql.join(rawChoiceIds, sql`, `));
sanitizedChoiceIds.push(sql.raw("}::uuid[])"));
const sanitizedChoiceIdsQuery = sql.join(sanitizedChoiceIds);

sqlQuery.append(sanitizedChoiceIdsQuery);
console.log((await import("util")).inspect(sqlQuery, undefined, 5));
const insertVote = await db.execute(sqlQuery);
console.log((await import("util")).inspect(insertVote, undefined, 4));

console.log("Finished!");
