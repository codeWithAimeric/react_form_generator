import React from "react";

const SelectInput = ({field, value, onChangeFunction}) => {
    return(
        <>
            <div className={`mb-2`}>
                <label className={field.classes?.label} htmlFor={field.name}>{field.label}</label>
            </div>
            <div>
                <select name={field.name} className={field.classes.input} onChange={onChangeFunction} value={value}>
                    <option value=""></option>
                    {field.values.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default SelectInput;