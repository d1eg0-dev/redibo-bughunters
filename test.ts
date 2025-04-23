import mysql from 'mysql2/promise';

async function testConnection() {
  try {
    const conn = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'bughunters',
    });
    console.log('✅ ¡Conectado correctamente!');
    await conn.end();
  } catch (err) {
    console.error('❌ Error al conectar:', err);
  }
}

testConnection();
