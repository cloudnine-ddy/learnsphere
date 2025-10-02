import React from "react";

import styles from "./ReportSquare.module.css"

function ReportSquare({title, number, description}){
    return(
        <div className={styles.square}>
            
            <div className={styles.title}>{title}</div>
            <div className={styles.number}>{number}</div>
            <div className={styles.description}>{description}</div>
        
        
        
        </div>
        
    )
}

export default ReportSquare