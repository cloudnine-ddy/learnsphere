import React from "react";
import InputField from "./InputField";
import styles from "./AddToList.module.css";


function AddToList({ label, placeholder, currentItem, setCurrentItem, itemList, setItemList }) {
    const handleAddBook = () => {
        if (currentItem.trim()) {
            setItemList(prev => [...prev, currentItem.trim()]);
            setCurrentItem("");
        }
    };

    const handleDelete = (itemToDelete) => {
        setItemList(prev => prev.filter(item => item !== itemToDelete));
    };

    return (
        <div className={styles.wholeField}>
            <div className={styles.addingPart}>
                <InputField
                    label={label}
                    type="text"
                    value={currentItem}
                    onChange={(e) => setCurrentItem(e.target.value)}
                    placeholder={placeholder}
                    style = {{flex:1}}
                />
                <button className={styles.addButton} type="button" onClick={handleAddBook}>Add</button>
            </div>

            <ul className={styles.readingList}>
                {itemList.map((book, index) => (
                    <li key={index} className={styles.readingItem}>
                        {book}
                        <button className={styles.deleteButton} onClick={() => handleDelete(book)}>
                            Delete
                        </button>
                        </li>
                    
                ))}
            </ul>
        </div>
    );
}

export default AddToList;





