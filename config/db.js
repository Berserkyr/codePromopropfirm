const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// Gere la connexion a la bdd
connection.connect((err) => {
  if (err) throw err;
  console.log('Connexion a la base de données réussie');
});

module.exports = connection;
