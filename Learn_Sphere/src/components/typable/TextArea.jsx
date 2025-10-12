import React from "react";

import styles from "./TextArea.module.css";

function TextArea({
  label,
  id,
  type = "text",
  placeholder = "",
  value,
  onChange,
}) {
  return (
    <div className={styles.formRow}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <div className={styles.inputField}>
        <textarea
          className={styles.input}
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
}

export default TextArea;
