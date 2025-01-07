# Utilisation d'une image Node.js officielle
FROM node:18

# Répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tous les fichiers de l'application
COPY . .

# Exposer le port (modifier selon votre port utilisé dans server.js)
EXPOSE 3001

# Commande pour démarrer l'application
CMD ["npm", "start"]
