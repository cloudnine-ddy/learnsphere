import React from "react";
import AuthHeader from "../layout/AuthHeader";
import RoleSelection from "../components/RoleSelection";
import RegisterForm from "../forms/RegisterForm"
import { useState } from "react";

import styles from "./RegisterPage.module.css";
import MessageBox from "../components/MessageBox";

function RegisterPage() {

  const [selectedRole, setSelectedRole] = useState("student");

  return (
    <div className={styles.mainContent}>
      <AuthHeader />
      <div className={styles.pageContent}>
        <RoleSelection 
         selectedRole = {selectedRole}
         setSelectedRole = {setSelectedRole}
         />
        <RegisterForm 
          selectedRole = {selectedRole} />
      </div>
    </div>
  );
}

export default RegisterPage;
