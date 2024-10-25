const mysql = require('mysql2/promise'); // Utilise la version avec promesses

// Créer un pool de connexions avec les options keepAlive
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,         
  queueLimit: 0,              
  keepAliveInitialDelay: 10000, 
  enableKeepAlive: true        
});

// Test de la connexion
connection.getConnection()
  .then(conn => {
    console.log('Connexion à la base de données réussie');
    conn.release(); 
  })
  .catch(err => {
    console.error('Erreur de connexion à la base de données:', err);
  });

module.exports = connection;
