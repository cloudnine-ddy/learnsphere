import React, { useState, useEffect } from "react";
import styles from "./TokenGenerator.module.css"
import { getCurrentUser, getUserInfo, getTokens, createToken, useToken } from "./manageUsers";
import { useNavigate } from "react-router-dom";


function TokenGenerator({label="Generate", role="student"}, prefix="STUDENT") {
    const [tokens, setTokens] = useState([]);
    let navigate = useNavigate("/home");

    useEffect(() => {
    //Runs when token state is changed
        getTokens(role).then(
            (tokens) => {
                setTokens(tokens);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [tokens])

    const generateToken = () => {
        const randomToken = {prefix} + Math.random().toString(36).substring(2, 7).toUpperCase();
        createToken(randomToken, role).then(
            () => {
                console.log("success!");
            }
        )
        .catch(
            (error) => {
                if (error == "TRY_AGAIN")
                {
                    generateToken();
                }
                else
                {
                    navigate("/home");
                }
            }
        );
        //setTokens([...tokens, { value: randomToken, status: "Available" }]);
    };

    return (
        <div className={styles.wholeField}>
            <button type="submit" onClick={generateToken} className={styles.button}>{label}</button>

            <div>
                {tokens.map((token, index) => (
                    <div key={index} className={styles.tokenField}>
                        <span className={styles.token}>
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