import React, {useEffect, useState} from 'react';
import generateYupSchema from './service/validator'
import './App.css'
import SimpleInput from "./components/SimpleInput.jsx";
import RadioInput from "./components/RadioInput.jsx";
import SelectInput from "./components/SelectInput.jsx";
import {FileInput} from "./components/FileInput.jsx";
import TextEditor from "./components/TextEditor.jsx";


const FormBuilder = ({ formConfig , submitForm,  initialValue = null} ) => {
  const [values, setValues] = useState(
      formConfig.fields.reduce((acc, field) => {
        if(null !== initialValue) acc[field.name] = initialValue[field.name];
        else acc[field.name] = field.type === 'number' ? 0 : '';

        return acc;
      }, {})
  )

  const [history, setHistory] = useState([values])

  const [resetEnable, setResetEnable] = useState(false);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const validationSchema = generateYupSchema(formConfig.fields);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    addHistory()
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setValues({
      ...values,
      [event.target.name]: selectedFile,
    });

    addHistory()
  };

  const handleChangeEditor = (value, name) => {
    setValues({
      ...values,
      [name]: value,
    });

    addHistory()
  };

  const addHistory = () => {
    setHistory((prevHistory) => [...prevHistory, values])
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const toggleReset = () => {
    setResetEnable(history.length > 1);
  }

  const resetHistory = () => {
    setHistory([history[0]])
  }

  const handleReset = (e) => {
    e.preventDefault()
    setValues(history[0])
    resetHistory()
  }

  const handleUndo = (e) => {
    e.preventDefault()
    setValues(history[history.length - 1])
    setHistory(prevHistory => prevHistory.slice(0, -1));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

  const updatedValues = { ...values };

  // ajouter la valeur du textEditor dans le formulaire et valider
  setValues(prevValues => {
    const finalValues = { ...prevValues, ...updatedValues };

    validationSchema.validate(finalValues, { abortEarly: false })
      .then(() => {
        submitForm(finalValues);
        setErrors({});
      })
      .catch((err) => {
        console.log(err);
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      });
      console.log(finalValues);
    return finalValues;
  });
  };

  useEffect(() => {
    toggleReset()
  }, [history, toggleReset])

  return (
    <div >
      <h1 className={`text-danger`}>{formConfig.title}</h1>
      <p>{formConfig.description}</p>
      <form onSubmit={handleSubmit}>
        {formConfig.fields.map((field) => (
          <div key={field.name} className={field.classes?.group}>
            {field.type !== 'radio' && 'select' !== field.type && 'file' !== field.type && 'editor' !== field.type ? (
              <SimpleInput field={field} value={values[field.name]} onChangeFunction={handleChange} />
            ) : null}

            {field.type === 'radio' && field.values ? (
              <RadioInput field={field} onChangeFunction={handleChange} value={values[field.name]}/>
            ) : null}

            {field.type === 'file' ? (
                <FileInput field={field} handleChange={handleFileChange} file={file} />
            ) : null}

            {'select' === field.type && field.values ? (
                <SelectInput field={field} value={values[field.name]} onChangeFunction={handleChange} />
            ) : null}

            {field.type === 'editor' ? (
              <TextEditor field={field} value={values[field.name]} onChangeFunction={handleChangeEditor} />
            ): null}
            {errors[field.name] && <div style={{color: "red"}}>{errors[field.name]}</div>}
          </div>
        ))}
        <div className={`d-flex justify-content-between`}>
          <button type="submit">{formConfig.submitButton}</button>
          {null !== initialValue ? (
              <div>
                <button className={`btn-danger me-3`} onClick={handleUndo} disabled={!resetEnable}>{formConfig.undoButton}</button>
                <button className={`btn-danger`} onClick={handleReset} disabled={!resetEnable}>{formConfig.resetButton}</button>
              </div>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default FormBuilder;
