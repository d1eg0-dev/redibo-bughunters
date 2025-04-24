import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'caboose.proxy.rlwy.net',
  user: 'root',
  password: 'BNZRNGMnhuqnrlVxeblFVBiuCxgYHfrS',
  database: 'railway',
  port: 46782,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
  //hola
});

export default db;
