const FORM = {
    title: 'Inscription',
    description: 'Veuillez remplir ce formulaire pour créer votre compte.',
    submitButton: "S'inscrire",
    fields: [
      {
        name: 'firstName',
        label: 'Prénom',
        type: 'text',
        required: true,
        placeholder: 'John',
      },
      {
        name: 'lastName',
        label: 'Nom',
        type: 'text',
        required: true,
        placeholder: 'Doe',
      },
     
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        placeholder: 'john.doe@example.com',
        validations: [
          {
            type: 'email',
            message: 'Veuillez saisir un email valide.',
          },
        ],
      },
     
      {
        name: 'password',
        label: 'Mot de passe',
        type: 'password',
        required: true,
        validations: [
          {
            type: 'minLength',
            value: 8,
            message: 'Le mot de passe doit faire au moins 8 caractères.',
          },
        ],
      },
      {
        name: 'number',
        label: 'Number',
        type: 'number',
        required: true,
        placeholder: 'Number',
      },
      {
        name: 'date',
        label: 'Date',
        type: 'date',
        required: true,
        placeholder: 'Date',
      },
     
    ],
  };

  export default FORM;