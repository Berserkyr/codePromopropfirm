const pool = require('../config/db');

// Ajoute une nouvelle propfirm a la bdd
exports.createPropFirm = async (req, res) => {
    const { nom, description, logo_url } = req.body;
    const query = 'INSERT INTO prop_firm (nom, description, logo_url) VALUES (?, ?, ?)';
  
    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query(query, [nom, description, logo_url]);
      connection.release();
  
      res.json({ message: 'Prop Firm ajoutée avec succès', propFirmId: results.insertId });
    } catch (err) {
      console.error("Erreur SQL : ", err);
      res.status(500).json({ message: 'Erreur lors de l\'ajout de la Prop Firm' });
    }
  };
  