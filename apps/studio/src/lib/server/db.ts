// import { dbPg } from "@db/adapter-pg";
// import { dbClient } from "@db/client";
// import { Pool } from "pg";
// import { dev } from "../config";

// const dbClientSingleton = () => {
//   if (dev) {
//     const client = new dbClient();
//     // const client = new dbClient();

//     return client;
//   } else {
//     const connectionString = process.env.DATABASE_URL;
//     const pool = new Pool({ connectionString });
//     const adapter = new dbPg(pool);
//     const client = new dbClient({ adapter });
//     // const client = new dbClient();

//     return client;
//   }
// };

// declare global {
//   var dbGlobal: undefined | ReturnType<typeof dbClientSingleton>;
// }

// const db = globalThis.dbGlobal ?? dbClientSingleton();

// export { db };

// if (dev) globalThis.dbGlobal = db;
