const pool = require('../config/db');

// Sert a ajouter quelqu'un a la newsletter
exports.addUserToNewsletter = async (req, res) => {
    const { nom, prenom, mail } = req.body;
  
    if (!nom || !prenom || !mail) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }
  
    const query = 'INSERT INTO alert (nom, prenom, mail) VALUES (?, ?, ?)';
  
    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query(query, [nom, prenom, mail]);
      connection.release();
      res.json({ message: 'Utilisateur ajouté à la newsletter avec succès', userId: results.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'utilisateur à la newsletter' });
    }
  };
  