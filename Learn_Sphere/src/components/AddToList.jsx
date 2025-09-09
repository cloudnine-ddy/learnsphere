import React from "react";
import InputField from "./InputField";
import styles from "./AddToList.module.css";


function AddToList({ currentBook, setCurrentBook, readingList, setReadingList }) {
    const handleAddBook = () => {
        if (currentBook.trim()) {
            setReadingList(prev => [...prev, currentBook.trim()]);
            setCurrentBook("");
        }
    };

    const handleDelete = (itemToDelete) => {
        setReadingList(prev => prev.filter(item => item !== itemToDelete));
    };

    return (
        <div className={styles.wholeField}>
            <div className={styles.addingPart}>
                <InputField
                    label="Reading List"
                    type="text"
                    value={currentBook}
                    onChange={(e) => setCurrentBook(e.target.value)}
                    placeholder="Enter book title"
                    style = {{flex:1}}
                />
                <button className={styles.addButton} type="button" onClick={handleAddBook}>Add</button>
            </div>

            <ul className={styles.readingList}>
                {readingList.map((book, index) => (
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





