# MGoal

Application mobile qui va te faire penser à ton objectif, peut-être même à t'aider à t'organiser pour te l'approprier.

*Made using **Expo**, **React Native**, **Express JS**, **MongoDB(Altas)**, **Cloudinary***

<p style="float:left">
  <kbd><img src="https://i.ibb.co/HX9CD9P/expo-logo-icon-145293-1.png" alt="expo logo" /></kbd>
  <kbd><img src="https://i.ibb.co/j6sC5m6/rn-logo-1-1-1.png" alt="react native logo" /></kbd>
  <kbd><img src="https://i.ibb.co/whwBV6h/express-logo-1.png" alt="express js logo" /></kbd>
  <kbd><img src="https://i.ibb.co/cYK67Hb/mongodb-1-modified.png" alt="mongodb logo" /></kbd>
  <kbd><img src="https://i.ibb.co/jh9GCfY/cloudinary-1.jpg" alt="cloudinary logo" /></kbd>
</p>

Let's go :memo: 🥳 :rocket:


__N.B__ Pour de raison de sécurité et de performance du serveur qui maintient les provenances et la mise à jour des données dans cette application, nous étions contraint de limiter l'accès à notre api à nous-même. Néanmoins, nous vous avons fourni la totalité du code de l'api pour que vous puissez mettre en place la votre afin de tester cette application.

*Bien à vous*

**RABE Marcellin**

<kbd><img src="https://i.ibb.co/2PtKvsJ/email-1.jpg" alt="email" /></kbd>
marcellinr.rabe@gmail.com

<kbd><img src="https://i.ibb.co/WFjPGhf/Facebook-f-logo-2019-svg-1.png" alt="facebook" /></kbd>
[Rabe Marcellin](https://facebook.com/rabemarcellin)

<kbd><img src="https://i.ibb.co/1MLfLdn/329-linkedin-1.jpg" alt="linkedin" /></kbd>
[Marcellin Rabe](https://linkedin.com/in/marcellinrabe)


<h1>Installation</h1>

> Ouvrir un terminal dans votre répertoire local de votre choix.

``` 
$ git clone https://github.com/rabemarcellin/MGoal.git
```

<h2>API</h2>
<h3>Prérequis</h3>

__N.B__ : tous ce qui se passe dans cette section se trouve dans le dossier ```/api/```

> Creer un fichier ```.env``` et copiez-coller les lignes de code dans le fichier ```.env.example```

```
# ./.env.example

MONGODB_URI=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

L'application utilise [MongoDB](https://mongodb.com) pour la gestion des données. Je vous conseille d'installer MongoDB sur votre pc si
ce n'est pas encore fait et affecter la valeur de votre propre uri à la variable d'environnement ```MONGODB_URI```

L'application utilise aussi [Cloudinary](https://cloudinary.com) pour le stockage des images et generer des url pointant sur celle-ci. aller ce ce site [https://cloudinary.com)[Cloudinary] et créer un compte pour développeur et il vous sera fourni les informations complementaires(obligatoire) des variables d'environnement ```CLOUDINARY_CLOUD_NAME```, ```CLOUDINARY_API_KEY```, ```CLOUDINARY_API_SECRET``` 

> Installer les dépendances nécessaire

```
$ yarn install
```

<h3>Lancement du serveur API</h3>

```
$ yarn dev
```

<h3>Application mobile</h3>
<h2>Prérequis</h2>

__N.B__ : tous ce qui se passe dans cette section se trouve dans le dossier ```/mobile/```

> Parce que L'application est un projet EXPO sous SDK 48, l'utilisation de ```.env``` n'est pas encore supportée. Alors il nous faillait improvisé en créer un fichier ```env.js``` à partir du fichier ```env.example.js```

```
/* ./src/env.example.js */

// eviter d'utiliser http://127.O.0.1 ou http://localhost, utiliser plutôt l'adresse ip de votre pc
export const API_URL="sorry, for avoid server error due for too many requests"
```

> Installer les dépendances nécessaire

```
$ yarn install
```

<h3>Lancement du serveur API</h3>

```
$ yarn start
```

*Merci d'avoir tester* :smile:<br/>
Envoyer-moi vos retours SVP 🙂



