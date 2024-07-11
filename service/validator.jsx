import * as Yup from 'yup';
const generateYupSchema = (fields) => {
    const shape = {};
    fields.forEach((field) => {
      let validator = null;
  
      switch (field.type) {
        case 'text':
        case 'email':
        case 'password':
          validator = Yup.string();
          if (field.required) {
            validator = validator.required('Ce champ est requis');
          }
          break;
        case 'number':
          validator = Yup.number();
          if (field.required) {
            validator = validator.required('Ce champ est requis');
          }
          break;
        case 'date':
          validator = Yup.date();
          validator = validator.typeError('Veuillez entrer une date valide.');
          if (field.required) {
            validator = validator.required('Ce champ est requis');
          }
          break;
        case 'file':
          validator = Yup.mixed();
          if (field.required){
            validator = validator.required('Ce champ est requis');
            
          } 
          break; 
        case 'editor':
          validator = Yup.string();
          if (field.required){
            validator = validator.required('Ce champ est requis');
          }  
        default:
          validator = Yup.string();
          if (field.required) {
            validator = validator.required('Ce champ est requis');
          }
      }
  
      if (field.validations) {
        field.validations.forEach((validation) => {
          let max;
          switch (validation.type) {
            case 'email':
              validator = validator.email(validation.message);
              break;
            case 'minLength':
              validator = validator.min(validation.value, validation.message);
              break;
            case 'min':
              validator = validator.min(validation.value, validation.message);
              break;
            case 'max':
              validator = validator.max(validation.value, validation.message);
              break;
            case 'regex':
              validator = validator.matches(new RegExp(validation.value),validation.message);
              break; 
            case 'fileSize':
              max = parseInt(validation.maxSize) * 1024 * 1024;
              validator = validator.test('fileSize', validation.message, value => value && value.size <= max); 
              break;
            case 'fileFormat':
              validator = validator.test('fileFormat',validation.message, value => value && validation.formats.includes(value.type))
              break;  
            default:
              break;
          }
        });
      }
  
      shape[field.name] = validator;
    });
    return Yup.object().shape(shape);
  };
  export default generateYupSchema ;
