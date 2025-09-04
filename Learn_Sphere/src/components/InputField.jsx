import React from "react";

import styles from "./PasswordField.module.css";

function InputField({label, id, type="text", placeholder="", value, onChange}) {
    return (
        <div className={styles.formRow}>
            <label htmlFor={id}>{label}</label>
            <div className={styles.inputField}>
                <input 
                className={styles.input}
                id = {id}
                name = {id} 
                type = {type}
                placeholder={placeholder}
                value = {value}
                onChange = {onChange}
                required
            />  
            </div>
        </div>
    );
}

export default InputField;