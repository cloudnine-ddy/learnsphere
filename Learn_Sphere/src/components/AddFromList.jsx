import React from "react";
import styles from "./AddFromList.module.css"; // 复用相同CSS

function AddFromList({ prerequisites, setPrerequisites, prerequisiteOptions }) {

  const handleAdd = (e) => {
    const selected = e.target.value;
    if (selected && !prerequisites.includes(selected)) {
      setPrerequisites(prev => [...prev, selected]);
    }
  };

  const handleDelete = (itemToDelete) => {
    setPrerequisites(prev => prev.filter(item => item !== itemToDelete));
  };


  return (
    <div className={styles.wholeFiled}>

      <label className={styles.label} >Prerequisite Lessons</label>

      <div className={styles.addingPart}>

        <select onChange={handleAdd} defaultValue="">
          <option value="" disabled>Select a prerequisite</option>
          {prerequisiteOptions.map((opt, idx) => (
            <option key={idx} value={opt}>{opt}</option>
          ))}
        </select>

      </div>

      <ul className={styles.selectedList}>
        {prerequisites.map((prereq, index) => (
          <li key={index} className={styles.selectedItem}>
            {prereq}
            <button className={styles.deleteButton} onClick={() => handleDelete(prereq)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddFromList;
