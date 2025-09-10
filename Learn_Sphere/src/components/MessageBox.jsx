import React from "react";

import styles from "./MessageBox.module.css";

function MessageBox(label="Delete Lesson", message="Are you sure?", button_1="Cancel", button_2="Confirm") {
    return (
        <div className={styles.box}>
            <div className={styles.title}>
                {label}
            </div>
            <div className={styles.messageArea}>
                {message}
            </div>
            <div className={styles.buttonArea}>
                <button className={styles.smallButton} style={{background: "#beb2a4"}} >
                    {button_1}
                </button>
                <button className={styles.smallButton}>
                    {button21}
                </button>
            </div>
        </div>
    );
}

export default MessageBox;