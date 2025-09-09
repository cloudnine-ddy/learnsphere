
import React, { useState, useEffect } from "react";

import InputField from "../components/InputField";
import TextArea from "../components/TextArea";
import Button from "../components/Button";
import AddToList from "../components/AddToList";
import AddFromList from "../components/AddFromList";
import TitleDropdown from "../components/TitleDropdown";
import SelectOneFromList from "../components/SelectOneFromList";
import SelectStatus from "../components/SelectStatus";
import TokenGenerator from "../components/TokenGenerator";
import { getCurrentUser, getUserInfo } from "../components/manageUsers";

import styles from "./AdminPortal.module.css";

function AdminPortal() {
    
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

    return (
        <div className={styles.wrapper}>

            <div className={styles.infoHeader}>
                <div className={styles.infoTitle}>
                    Admin Portal
                </div>
            </div>

            


            <div className={styles.container}>
                <div className={styles.tokenArea}>
                    <div className={styles.tokenTitle}>
                        Private Token
                    </div>
                    <div className={styles.generatorArea}>

                        <div className={styles.studentGenerator}>
                            <TokenGenerator label="Generate Student Token"/>
                        </div>

                        <div className={styles.instructorGenerator}>
                            <TokenGenerator label="Generate Instructor Token"/>
                        </div>

                    </div>

                </div>
                
            </div>

        </div>
    );
}

export default AdminPortal;