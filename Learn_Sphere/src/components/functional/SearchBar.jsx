import React, { useState, useEffect, useMemo } from "react";
import InputField from "../typable/InputField";
import styles from "./SearchBar.module.css";



function SearchBar({users, deleteHandler}) {

    const [searchValue, setSearchValue] = useState("");
    const [searchBar, setSearchBar] = useState("");

    const selectedUsers = useMemo(() => {
        console.log(users);
        return users.filter((user) => {
            let fullName = `${user.firstName} ${user.lastName}`;
            console.log(fullName, searchValue, fullName.includes(searchValue));
            return fullName.includes(searchValue);
        });
    }, [searchValue, users])
    console.log(selectedUsers);

    function handleDelete(token)
    {
        deleteHandler(token);
    }

  return (   
    <div className={styles.wrapper}> 
    
        <div className={styles.searchBar}>
            <input
                label="Student Name"
                type="text"
                id="student_name"
                value={searchBar}
                onChange={(e) => {setSearchBar(e.target.value)}}
                className={styles.searchInput}

                onKeyDown={(e) => {
                    if (e.key == "Enter")
                    {
                        setSearchBar(e.target.value);
                    }
                }}
            />

            <button className={styles.searchButton} onClick={() => setSearchValue(searchBar)}>
                <img src="images/icons/add.png" alt="" className={styles.searchIcon} />
            </button>
        </div>

        {selectedUsers.map((user) => (
            <div className={styles.resultField}>
                <span className={styles.resultItem}>
                    {`${user.firstName} ${user.lastName}`}
                </span>

                <button className={styles.deleteButton} onClick={() => handleDelete(token)}>
                    Delete
                </button>

            </div>
        ))}
    </div> 
  );
}

export default SearchBar;
