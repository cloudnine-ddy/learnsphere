import React, { useState, useEffect } from "react";

import { getCurrentUser, getUserInfo } from "../../components/manageUsers";

import styles from "./ControlPanel.module.css";

import TokenGenerator from "../../components/functional/TokenGenerator";
import SearchBar from "../../components/functional/SearchBar";



function ControlPanel() {
    
    useEffect(() => {
    //Runs only at first render to kick out students
        getCurrentUser().then(
            (user) => {
                return getUserInfo(user);
            })
            .then((info) => {
                if (info.role !== "admin")
                {
                    navigate("/home");
                }
            });
    }, [])

    return (
        <div className={styles.wrapper}>

            <div className={styles.infoHeader}>
                <div className={styles.infoTitle}>
                    Control Panel
                </div>
            </div>

            


            <div className={styles.container}>
                
                <SearchBar />
                
                <div className={styles.tokenArea}>
                    <div className={styles.tokenTitle}>
                        Private Token
                    </div>
                    <div className={styles.generatorArea}>

                        <div className={styles.studentGenerator}>
                            <TokenGenerator label="Generate Student Token" role="student" prefix="STUDENT"/>
                        </div>

                        <div className={styles.instructorGenerator}>
                            <TokenGenerator label="Generate Instructor Token" role="instructor" prefix="INSTRUCT"/>
                        </div>

                    </div>

                </div>
                
            </div>

        </div>
    );
}

export default ControlPanel;