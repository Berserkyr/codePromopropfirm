const pool = require('../config/db');

// Permet de récup les codes promo
exports.getCodes = async (req, res) => {
  const itemsPerPage = 5; // ou 99 selon ta préférence
  const page = parseInt(req.query.page) || 1;
  const startIndex = (page - 1) * itemsPerPage;

  // Jointure entre `code_promo` et `prop_firm` pour récupérer les informations souhaitées
  const query = `
    SELECT 
      p.nom AS firm_name, 
      p.logo_url AS firm_logo,
      c.description AS promo_description, 
      c.discount_percentage AS promo_discount, 
      c.code AS promo_code
    FROM code_promo c
    JOIN prop_firm p ON c.prop_firm_id = p.id
    LIMIT ?, ?
  `;

  try {
      const connection = await pool.getConnection();
      const [results] = await connection.query(query, [startIndex, itemsPerPage]);
      
      // Comptage total des éléments pour la pagination
      const [countResults] = await connection.query('SELECT COUNT(*) as count FROM code_promo');
      const totalItems = countResults[0].count;

      connection.release();

      // Renvoi des données avec pagination
      res.json({
          data: results,
          totalItems,  
          itemsPerPage,
          currentPage: page
      });
  } catch (err) {
      console.error("Erreur SQL : ", err);
      res.status(500).json({ message: 'Erreur lors de la récupération des codes promo' });
  }
};






//Permet d'ajouter un code promo
exports.createCode = async (req, res) => {
  const { nom, image, presentation, url, code } = req.body;
  const query = 'INSERT INTO codes (nom, image, presentation, url, code) VALUES (?, ?, ?, ?, ?)';

  try {

    const connection = await connection.getConnection();

    const [results] = await connection.query(query, [nom, image, presentation, url, code]);

    connection.release();

    res.json({ message: 'Code Promo Ajouté' });
  } catch (err) {
    console.error("Erreur SQL : ", err);
    res.status(500).json({ message: "Erreur lors de l'ajout" });
  }
};


//Permet de mettre a jour le code promo
exports.updateCode = async (req, res) => {
  const { id } = req.params; 
  const { code } = req.body; 
  const query = 'UPDATE codes SET code = ? WHERE id = ?';

  try {

    const connection = await pool.getConnection();


    const [results] = await connection.query(query, [code, id]);


    connection.release();


    if (results.affectedRows === 0) {
      res.status(404).json({ message: "Aucun enregistrement trouvé avec cet ID" });
    } else {
      res.json({ message: 'Code mis à jour avec succès' });
    }
  } catch (err) {

    console.error("Erreur SQL : ", err);
    res.status(500).json({ message: "Erreur lors de la mise à jour du code" });
  }
};


//Permet de mettre a jour l'url d'un code promo
exports.updateUrl = async (req, res) => {
  const { id } = req.params; 
  const { url } = req.body; 
  const query = 'UPDATE codes SET url = ? WHERE id = ?';

  try {

    const connection = await pool.getConnection();
    const [results] = await connection.query(query, [url, id]);


    connection.release();

 
    if (results.affectedRows === 0) {
      res.status(404).json({ message: "Aucun enregistrement trouvé avec cet ID" });
    } else {
      res.json({ message: 'URL mise à jour avec succès' });
    }
  } catch (err) {

    console.error("Erreur SQL : ", err);
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'URL" });
  }
};

  
