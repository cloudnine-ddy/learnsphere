import React, { useState, useEffect } from "react";
import styles from "./TokenGenerator.module.css"
import { getCurrentUser, getUserInfo, getTokens, createToken, useToken } from "./manageUsers";
import { useNavigate } from "react-router-dom";


function TokenGenerator({label="Generate"}) {
    const [tokens, setTokens] = useState([]);
    let navigate = useNavigate("/home");

    useEffect(() => {
    //Runs only at first render to kick out students
        getCurrentUser().then(
            (user) => {
                return getUserInfo(user);
            })
            .then((info) => {
                if (info.role == "student")
                {
                    navigate("/home");
                }
            });
    }, [])

    useEffect(() => {
    //Runs when token state is changed
        getTokens().then(
            (tokens) => {
                setTokens(tokens);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [tokens])

    const generateToken = () => {
        const randomToken = "STUDENT" + Math.random().toString(36).substring(2, 7).toUpperCase();
        createToken(randomToken).then(
            () => {
                console.log("success!");
            }
        )
        .catch(
            (error) => {
                if (error == 808)
                {
                    // generateToken();
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