import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import {
  getCurrentUser,
  getUserInfo,
  getTokens,
  createToken,
  useToken,
  removeToken,
} from "../manageUsers";

import styles from "./TokenGenerator.module.css";

function TokenGenerator({
  label = "Generate",
  role = "student",
  prefix = "STUDENT",
}) {
  const [tokens, setTokens] = useState([]);
  let navigate = useNavigate("/home");

  useEffect(() => {
    //Runs when token state is changed
    getTokens(role)
      .then((tokens) => {
        setTokens(tokens);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [tokens]);

  const generateToken = () => {
    const randomToken =
      `${prefix}` + Math.random().toString(36).substring(2, 7).toUpperCase();
    createToken(randomToken, role)
      .then(() => {
        console.log("success!");
      })
      .catch((error) => {
        if (error == "TRY_AGAIN") {
          generateToken();
        } else {
          navigate("/home");
        }
      });
    //setTokens([...tokens, { value: randomToken, status: "Available" }]);
  };

  const handleDelete = (token) => {
    console.log(token);
    removeToken(token.value);
  };

  return (
    <div className={styles.wholeField}>
      <button type="submit" onClick={generateToken} className={styles.button}>
        {label}
      </button>

      <div className={styles.wrapper}>
        {tokens.map((token, index) => (
          <div key={index} className={styles.tokenField}>
            <span className={styles.token}>{token.value}</span>

            <span
              className={
                token.status === "Available"
                  ? styles.tokenStatusAvailable
                  : styles.tokenStatusUsed
              }
            >
              {token.status}
            </span>

            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(token)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TokenGenerator;
