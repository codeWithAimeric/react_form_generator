import React,{ useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SimpleInput = ({field, value, onChangeFunction, classes = null, formatAccepted = null, radioValue = null}) => {
    const fieldClassName = classes || field.classes;
    const fieldLabel = "radio" !== field.type ? <label className={field.classes?.label} htmlFor={field.name}>{field.label}</label> : null;
    const fieldPlaceholder = field.placeholder || null;
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            {fieldLabel}
            <div className='inputWrapper'>
            <input
                className={fieldClassName?.input}
                type={showPassword && field.type === 'password' ? 'text' : field.type}
                name={field.name}
                placeholder={fieldPlaceholder}
                value={value}
                onChange={onChangeFunction}
                accept={formatAccepted}
                id={field.name}
                checked={value === radioValue}
            />
           {field.type === 'password' && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className={fieldClassName?.toggleButton}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                )}
            </div>
        </>
    )
}
export default SimpleInput;