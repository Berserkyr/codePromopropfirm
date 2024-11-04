const pool = require('../config/db');

// Permet de récup les codes promo
exports.getCodes = async (req, res) => {
  const itemsPerPage = 5; // Nombre d'éléments par page
  const page = parseInt(req.query.page) || 1;
  const startIndex = (page - 1) * itemsPerPage;

  // Requête de jointure pour récupérer les informations nécessaires
  const query = `
    SELECT 
      p.nom AS firm_name, 
      p.logo_url AS firm_logo,
      p.url AS url,
      c.description AS promo_description, 
      c.discount_percentage AS promo_discount, 
      c.code AS promo_code
    FROM code_promo c
    JOIN prop_firm p ON c.prop_firm_id = p.id
    LIMIT ?, ?
  `;

  // Requête pour compter le nombre total de codes promo
  const countQuery = 'SELECT COUNT(*) as count FROM code_promo';

  try {
      const connection = await pool.getConnection();

      // Exécuter la requête de comptage
      const [countResults] = await connection.query(countQuery);
      const totalItems = countResults[0].count;

      // Calculer le nombre total de pages
      const totalPages = Math.ceil(totalItems / itemsPerPage);

      // Obtenir les éléments pour la page actuelle
      const [results] = await connection.query(query, [startIndex, itemsPerPage]);

      connection.release();

      // Renvoi des données avec pagination
      res.json({
        data: results,
        totalItems,
        itemsPerPage,
        totalPages, // Nombre total de pages
        currentPage: page
      });
  } catch (err) {
      console.error("Erreur SQL : ", err);
      res.status(500).json({ message: 'Erreur lors de la récupération des codes promo' });
  }
};


//Permet d'ajouter un code promo
exports.createCode = async (req, res) => {
  const { code, description, discount_percentage, valid_until, prop_firm_id, is_active } = req.body;
  const query = `
    INSERT INTO code_promo (code, description, discount_percentage, valid_until, prop_firm_id, created_at, updated_at, is_active)
    VALUES (?, ?, ?, ?, ?, NOW(), NOW(), ?)
  `;

  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query(query, [code, description, discount_percentage, valid_until, prop_firm_id, is_active]);
    connection.release();
    res.json({ message: 'Code Promo Ajouté', codePromoId: results.insertId });
  } catch (err) {
    console.error("Erreur SQL : ", err);
    res.status(500).json({ message: "Erreur lors de l'ajout" });
  }
};




//Permet de mettre a jour le code promo
exports.updateCode = async (req, res) => {
  const { id } = req.params; 
  const { code } = req.body; 
  const query = 'UPDATE code_promo SET code = ? WHERE id = ?';

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
  const query = 'UPDATE prop_firm SET url = ? WHERE id = ?';

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

exports.deleteCodeById = async (req, res) => {
  const { id } = req.params;

  const deleteQuery = `
    DELETE FROM code_promo WHERE id = ?
  `;

  try {
    const connection = await pool.getConnection();

    // Exécuter la requête de suppression
    const [deleteResults] = await connection.query(deleteQuery, [id]);
    connection.release();

    if (deleteResults.affectedRows === 0) {
      return res.status(404).json({ message: "Aucun code promo trouvé avec cet ID." });
    }

    res.json({ message: 'Code promo supprimé avec succès' });
  } catch (err) {
    console.error("Erreur SQL : ", err);
    res.status(500).json({ message: "Erreur lors de la suppression du code promo" });
  }
};


  
