import React from "react";
import SimpleInput from "./SimpleInput.jsx";

export const FileInput = ({field, handleChange, file}) => {
    let formatAccepted;
    switch (field.fileFormat){
        case 'image':
            formatAccepted = "image/*"
            break
        case 'pdf':
            formatAccepted = "application/pdf"
            break
        case 'docx':
        case 'doc':
            formatAccepted = ".doc, .docx"
            break
    }

    return (
        <>
            <SimpleInput field={field} onChangeFunction={handleChange} formatAccepted={formatAccepted}/>
            {file && <p>{file.name}</p>}
        </>
    )
}

