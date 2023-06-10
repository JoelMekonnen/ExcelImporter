import mysql from 'mysql';
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yourpassword',
    database: 'remotejob',
  });
export { connection };