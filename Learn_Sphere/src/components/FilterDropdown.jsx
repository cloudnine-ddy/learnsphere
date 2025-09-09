import React from "react";
import styles from "./FilterDropdown.module.css";

function FilterDropdown({label, options, changeEvent}) {
    
    
    return (
        <div className={styles.dropdown}>

            <button className={styles.dropdownButton}>
                {label} ▼
            </button>
            
            <div className={styles.dropdownContent}>
                {options.map((option) => <a onClick={(e) => changeEvent(e, option.state)}>{option.label}</a>)}
                
                {/* <a href="#">My Lessons</a> */}
            </div>

        </div>
    )
}

export default FilterDropdown;