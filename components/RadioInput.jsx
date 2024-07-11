import React from "react";
import SimpleInput from "./SimpleInput.jsx";

const RadioInput = ({field, value, onChangeFunction}) => {
    return(
        <>
            <div className={`mb-2`}>
                <label className={field.classes?.label} htmlFor={field.name}>{field.label}</label>
            </div>
            <div>
                {field.values.map((radioOption, index) => (
                    <div key={index} className={field.classes?.values?.blockContainer}>
                        <SimpleInput field={field} radioValue={value} value={radioOption.value} onChangeFunction={onChangeFunction} classes={field.classes?.values} />
                        <label className={field.classes?.values?.label}>
                            {radioOption.label}
                        </label>
                    </div>
                ))}
            </div>
        </>
    )
}

export default RadioInput;