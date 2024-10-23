const connection = require('../config/db');

// Sert a ajouter quelqu'un a la newsletter
exports.addUserToNewsletter = (req, res) => {
    const { nom, prenom, mail } = req.body;

    if (!nom || !prenom || !mail) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    const query = 'INSERT INTO alert (nom, prenom, mail) VALUES (?, ?, ?)';

    connection.query(query, [nom, prenom, mail], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'utilisateur à la newsletter' });
        }
        res.json({ message: 'Utilisateur ajouté à la newsletter avec succès', userId: results.insertId });
    });
};
