import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'mysql.railway.internal',
  user: 'root',
  password: 'BNZRNGMnhuqnrlVxeblFVBiuCxgYHfrS',
  database: 'railway',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
  //hola
});

export default db;
