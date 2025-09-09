import React from "react";
import styles from "./FilterDropdown.module.css";

function FilterDropdown({label}) {
    return (
        <div className={styles.dropdown}>

            <button className={styles.dropdownButton}>
                {label}
            </button>
            
            <div className={styles.dropdownContent}>
                <a href="#">All Lessons</a>
                <a href="#">My Lessons</a>
                <a href="#">My Lessons</a>
            </div>

        </div>
    )
}

export default FilterDropdown;