## 📎 Projet - My Digital School React Native Photo.

---

👤 **Guillaume Gruber**

---

### Objectifs et Compétences évalué

- Avoir un projet qui fonctionne avec un readme complété `(1)`.
- Nom, Prénom et commentaires particuliers sur ce qu'il reste à faire ou des points précis à améliorer dans le code.

- Code propre, petits composants, peu ou pas d'erreur TypeScript `(2)`.

- Mettre en place un écran qui permet de prendre des photos.
  Soit avec l'appareil photo de devant (selfie) soit avec l'appareil photo de derrière (classique) `(1)`.

- Afficher en bas à gauche (en premier), la photo la plus récente (la dernière prise) `(1)`.

- Pouvoir scroller horizontalement entre toutes les photos prises `(1)`.

- Chaque photo prise doit être enregistrée à l'aide d'AsyncStorage afin de la retrouver si l'utilisateur réouvre l'app ainsi que dans un contexte React ou un Store Redux. `(3)`.

- Au tap sur le picto nuage, sauvegarder dans la photothèque (Galerie Android, Photos iOS) et changer le statut du nuage qui passe de barré à complet `(4).

- Au tap sur le picto poubelle afficher une popin de confirmation (BottomSheet) de suppression de l'image.
- Confirmation fermeture de la popin et suppression de l'image en local et dans le state actuel.
- Annulation : fermeture de la popin `(3)`.

- Agrandir la zone d'image et ajouter un picto de partage, au tap sur ce picto afficher une boîte de dialog pour partager l'image `(2)`.

- Rajouter au tap sur l'icône de sauvegarde de la photo, l'upload de la photo sur un serveur node.js.
  Aide pour la partie serveur (voir projet server.js) `(2)`.

## 🔨 Installation

Les fichiers du back-end du serveur pour le projet sont présents dans ce répo.

Vous aurez besoin d'avoir `Node` et `npm` installés localement sur votre machine.

Clonez ce dépôt: https://github.com/lagrube/Photo-react-native.git.

Ouvrir un terminal et exécutez`npm install`.  
Ouvrir un autre terminal et se déplacer dans le dossier backend, exécutez `npm install`.  
Dans le dossier screen/TabOneScreen.tsx; remplacer `http://10.50.37.223:7070/multipart-upload` par votre adresse IP.  
Executez `npm start` dans les deux terminaux.

### 🔨 En résumé, pour faire fonctionner ce site

- Cloner ce repo. 
- Ouvrir le terminal sur le dossier du site.
- Tapez en ligne de commande `npm install` sur les terminaux.
- Modifier l'url des requêtes. 
- Puis tapez en ligne de commande `npm start` sur les terminaux. 

---

##### Utilisé dans ce projet

|  Languages   |     et     |           outils           |
| :----------: | :--------: | :------------------------: |
|  Javascript  |  Node.js   | NPM (Node Package Manager) |
|     CSS.     | Git/GitHub |                            |
| React Native |  MongoDb   |    Visual Studio Code.     |

---
