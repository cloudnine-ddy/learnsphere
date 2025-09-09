import React, { useState } from "react";

import styles from "./TokenGenerator.module.css"


function TokenGenerator({label}) {
    const [tokens, setTokens] = useState([]);

    const generateToken = () => {
        const randomToken = "STUDENT" + Math.random().toString(36).substring(2, 7).toUpperCase();
        setTokens([...tokens, { value: randomToken, status: "Available" }]);
    };

    return (
        <div className={styles.wholeField}>
            <button type="submit" onClick={generateToken} className={styles.button}>
                {label}
            </button>

            <div>
                {tokens.map((token, index) => (
                    <div key={index} className={styles.tokenField}>
                        <span>
                            {token.value}
                        </span>

                        <span className={token.status === "Available" ? styles.tokenStatusAvailable : styles.tokenStatusUsed}>
                            {token.status}
                        </span>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default TokenGenerator;