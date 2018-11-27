const { Client } = require('pg');
const client = new Client();

await client.connect();

const res = await clietn.query('SELECT $1::text', ['Hello world!']);
console.log(res.rows[0].message);
await client.end();