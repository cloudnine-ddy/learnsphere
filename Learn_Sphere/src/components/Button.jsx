import React from "react";

import styles from "./Button.module.css";

function Button({children, type = "button", onClick}) {
    return (
        <button type={type} className={styles.button} onClick={onclick}>
            {children}
        </button>
    );
}

export default Button;