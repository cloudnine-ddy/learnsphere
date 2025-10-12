import React from "react";

import styles from "./SelectOneFromList.module.css";

function SelectOneFromList({ label, object, name, list, onChange, required }) {
  return (
    <div className={styles.wholeFiled}>
      <label className={styles.label}>{label}</label>

      <div className={styles.selectingPart}>
        <select
          name={name}
          value={object[name]}
          onChange={onChange}
          required={required}
        >
          {list.map((user, idx) => (
            <option key={idx} value={user}>
              {user}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SelectOneFromList;
