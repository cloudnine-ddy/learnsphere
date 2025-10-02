import React, { useState } from "react";

import styles from "./SearchBar.module.css";



function SearchBar({}) {

  return (   
    <div className={styles.wrapper}> 
    
        <div className={styles.searchBar}>
            <input type="text" className={styles.searchInput} placeholder="Type your text" />
            <button className={styles.searchButton}>
                <img src="images/icons/add.png" alt="" className={styles.searchIcon} />
            </button>
        </div>







        <div className={styles.resultField}>
            <span className={styles.resultItem}>
                {/* {token.value} */}
                hahahaha
            </span>

            {/* <span className={token.status === "Available" ? styles.tokenStatusAvailable : styles.tokenStatusUsed}>
                {token.status}
            </span> */}

            <button className={styles.deleteButton} onClick={() => handleDelete(token)}>
                Delete
            </button>

        </div>

        <div className={styles.resultField}>
            <span className={styles.resultItem}>
                {/* {token.value} */}
                bibubibu
            </span>

            {/* <span className={token.status === "Available" ? styles.tokenStatusAvailable : styles.tokenStatusUsed}>
                {token.status}
            </span> */}

            <button className={styles.deleteButton} onClick={() => handleDelete(token)}>
                Delete
            </button>

        </div>


        <div className={styles.resultField}>
            <span className={styles.resultItem}>
                {/* {token.value} */}
                alalalalala
            </span>

            {/* <span className={token.status === "Available" ? styles.tokenStatusAvailable : styles.tokenStatusUsed}>
                {token.status}
            </span> */}

            <button className={styles.deleteButton} onClick={() => handleDelete(token)}>
                Delete
            </button>

        </div>


        <div className={styles.resultField}>
            <span className={styles.resultItem}>
                {/* {token.value} */}
                wiiiiiiiii
            </span>

            {/* <span className={token.status === "Available" ? styles.tokenStatusAvailable : styles.tokenStatusUsed}>
                {token.status}
            </span> */}

            <button className={styles.deleteButton} onClick={() => handleDelete(token)}>
                Delete
            </button>

        </div>
    </div> 
  );
}

export default SearchBar;
