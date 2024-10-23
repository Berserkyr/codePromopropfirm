const connection = require('../config/db');

// Permet de récup les codes promo
exports.getCodes = (req, res) => {
  const itemsPerPage = 5;
  const page = parseInt(req.query.page) || 1;
  const startIndex = (page - 1) * itemsPerPage;

  const query = 'SELECT * FROM codes';
  connection.query(query, [startIndex, itemsPerPage], (err, results) => {
      if (err) {
          console.error("Erreur SQL : ", err);  
          return res.status(500).json({ message: 'Erreur lors de la récupération des codes' });
      }
      res.json(results);  
  });
};



//Permet d'ajouter un code promo
exports.createCode = (req, res) => {
    const { nom, image, presentation, url, code } = req.body;
    const query = 'INSERT INTO codes (nom, image, presentation, url, code) VALUES (?, ?, ?, ?, ?)';
    
    connection.query(query, [nom, image, presentation, url, code], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur lors de l'ajout" });
      } else {
        res.json({ message: 'Code Promo Ajouté'});
      }
    });
  };

//Permet de mettre a jour le code promo
exports.updateCode = (req, res) => {
  const { id } = req.params; 
  const { code } = req.body; 
  const query = 'UPDATE codes SET code = ? WHERE id = ?';

  connection.query(query, [code, id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur lors de la mise à jour du code" });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: "Aucun enregistrement trouvé avec cet ID" });
    } else {
      res.json({ message: 'Code mis à jour avec succès' });
    }
  });
};

//Permet de mettre a jour l'url d'un code promo
exports.updateUrl = (req, res) => {
  const { id } = req.params; 
  const { url } = req.body; 
  const query = 'UPDATE codes SET url = ? WHERE id = ?';

  connection.query(query, [url, id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur lors de la mise à jour de l'URL" });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: "Aucun enregistrement trouvé avec cet ID" });
    } else {
      res.json({ message: 'URL mise à jour avec succès' });
    }
  });
};

  
