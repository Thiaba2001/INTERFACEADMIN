#Indiquer la version de node js utilisé
FROM node:16-alpine
# indiquer le répertoire de travail dans le conteneur
WORKDIR /app
# Copier le fichier package.json et package-lock.json
COPY package*.json  ./
# Installer les dépendances
RUN npm install
# copier le reste de l'application dans le répertoire de travail
COPY . .
# Ecposer le port que l'application 
EXPOSE 3000
#Contruire l'application pour la production
RUN npm run build
# Indiquer les commande pour executer l'application
CMD ["npm", "run","preview"]


