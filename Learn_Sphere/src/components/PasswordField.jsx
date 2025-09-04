import React, { useState } from "react";

import styles from "./PasswordField.module.css";

function PasswordField({label, id, placeholder=""}) {
    const [show, setShow] = useState(false)
    return (
        <div className={styles.formRow}>
            <label className={styles.label} htmlFor={id}>{label}</label>
            <div className={styles.inputField}>
                <input 
                className={styles.input}
                id = {id}
                name = {id} 
                type = {show ? "text" : "password"}
                placeholder={placeholder}
                required
                />
                <button
                    type="button"
                    className={styles.sideButton}
                    onClick={() => setShow(!show)}
                >
                    <img 
                        src = {show ? "images/icons/show.png" : "images/icons/hide.png"} 
                        alt = {show ? "show" : "hide"} 
                        className={styles.icon}
                    />
                </button>
            </div>
        </div>
    );
}

export default PasswordField;