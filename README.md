# Générateur de Formulaire React

## Installation

1. **Créer le fichier .npmrc dans le dossier root de votre projet:**
  - N'oubliez pas de remplacer YOUR_USERNAME et YOUR_TOKEN par votre username et votre token
    ```sh
    @YOUR_USERNAME:registry=https://npm.pkg.github.com/
    //npm.pkg.github.com/:_authToken=YOUR_TOKEN
    ```

2. **Lancer la commande suivante:**
    ```sh
    npm i @YOUR_USERNAME/PACKAGENAME
    ```

## Utilisation

Pour générer un formulaire, créez un fichier JSON au format suivant et utilisez-le dans votre composant React.

```json
{
  "title": "Inscription",
  "description": "Veuillez remplir ce formulaire pour créer votre compte.",
  "submitButton": "S'inscrire",
  "resetButton": "Réinitialiser",
  "undoButton": "Retour",
  "class": "",
  "fields": [
    {
      "name": "firstName",
      "label": "Prénom",
      "type": "text",
      "required": true,
      "placeholder": "John",
      "classes": {
        "group": "mb-3",
        "label": "form-label",
        "input": "form-control"
      }
    },
    ...
  ]
}
```
### Explication des Propriétés JSON

- **title** : Le titre du formulaire.
- **description** : Une brève description ou des instructions pour remplir le formulaire.
- **submitButton** : Texte du bouton de soumission du formulaire.
- **resetButton** : Texte du bouton de réinitialisation du formulaire.
- **undoButton**: Texte du bouton pour annuler la dernière modification du formulaire,
- **class** : Classes CSS supplémentaires pour le formulaire.
- **fields** : Un tableau d'objets représentant les champs du formulaire. Chaque objet champ définit un champ de formulaire et comprend les propriétés suivantes :

  - **name** : Identifiant unique pour le champ.
  - **label** : Texte du label pour le champ.
  - **type** : Le type du champ de formulaire (par exemple, `text`, `number`, `radio`, `date`, `email`, `password`, `file`, `select`, `editor`).
  - **required** : Booléen indiquant si le champ est obligatoire.
  - **placeholder** : Texte de l'espace réservé pour le champ.
  - **classes** : Classes CSS pour styliser les composants du champ.
    - **group** : Classe CSS pour le groupe de champs.
    - **label** : Classe CSS pour le label.
    - **input** : Classe CSS pour l'élément de saisie.
  - **values** (pour les types `radio` et `select`) : Un tableau d'objets contenant des paires `label` et `value` pour les options.
  - **validations** : Un tableau de règles de validation pour le champ.
    - **type** : Type de validation (par exemple, `min`, `max`, `minLength`, `regex`, `email`, `fileSize`, `fileFormat`).
    - **value** : Critère de validation (par exemple, valeur minimale, valeur maximale, motif regex).
    - **message** : Message d'erreur affiché en cas d'échec de la validation.

#### Exemples de Champs

1. **Exemple de Champ Texte :**
    ```json
    {
      "name": "firstName",
      "label": "Prénom",
      "type": "text",
      "required": true,
      "placeholder": "John",
      "classes": {
        "group": "mb-3",
        "label": "form-label",
        "input": "form-control"
      }
    }
    ```

2. **Exemple de Champ Radio :**
    ```json
    {
      "name": "gender",
      "label": "Genre",
      "type": "radio",
      "values": [
        {"label": "Homme", "value": "man"},
        {"label": "Femme", "value": "woman"},
        {"label": "Autre", "value": "other"}
      ],
      "required": true,
      "classes": {
        "group": "mb-3",
        "label": "",
        "values": {
          "blockContainer": "form-check form-check-inline",
          "label": "ms-2 form-check-label",
          "input": "ms-3 form-check-input"
        }
      }
    }
    ```

3. **Exemple de Champ Email :**
    ```json
    {
      "name": "email",
      "label": "Email",
      "type": "email",
      "required": true,
      "placeholder": "john.doe@example.com",
      "validations": [
        {
          "type": "email",
          "message": "Veuillez saisir un email valide."
        }
      ],
      "classes": {
        "group": "mb-3",
        "label": "form-label",
        "input": "form-control"
      }
    }
    ```

4. **Exemple de Champ Mot de Passe :**
    ```json
    {
      "name": "password",
      "label": "Mot de passe",
      "type": "password",
      "required": true,
      "validations": [
        {
          "type": "minLength",
          "value": 8,
          "message": "Le mot de passe doit faire au moins 8 caractères."
        },
        {
          "type": "regex",
          "value": "^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$",
          "message": "Le mot de passe doit contenir au moins une majuscule, un chiffre, un caractère spécial (!@#$%^&*), et être composé de 8 caractères minimum."
        }
      ],
      "classes": {
        "group": "mb-3",
        "label": "form-label",
        "input": "form-control"
      }
    }
    ```

5. **Exemple de Téléversement de Fichier :**
    ```json
    {
      "name": "upload",
      "label": "Téléverser une image",
      "type": "file",
      "fileFormat": "image",
      "required": false,
      "validations": [
        {
          "type": "fileSize",
          "maxSize": 8,
          "message": "Le fichier ne devrait pas dépasser 8MB"
        },
        {
          "type": "fileFormat",
          "formats": ["image/jpg", "image/jpeg", "image/gif", "image/png"],
          "message": "L'image devrait être au format jpg, jpeg, gif ou png"
        }
      ],
      "classes": {
        "group": "mb-3 form-group",
        "label": "form-label",
        "input": "form-control"
      }
    }
    ```

6. **Exemple de Champ Sélection :**
    ```json
    {
      "name": "freeVersion",
      "label": "Version Gratuite",
      "type": "select",
      "values": [
        {"label": "Oui", "value": "1"},
        {"label": "Non", "value": "0"}
      ],
      "required": true,
      "classes": {
        "group": "mb-3",
        "label": "form-label",
        "input": "form-select"
      }
    }
    ```

7. **Exemple d'Éditeur de Texte :**
    ```json
    {
      "name": "text-editor",
      "label": "Editeur de texte",
      "type": "editor",
      "required": true,
      "validations": [
        {
          "type": "min",
          "value": 15,
          "message": "La description doit avoir au moins 15 caractères"
        }
      ]
    }
    ```

---
