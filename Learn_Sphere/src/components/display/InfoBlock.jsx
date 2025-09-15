import React from "react";

import styles from "./InfoBlock.module.css"



function InfoBlock({title, content, renderItem}) {
    return (
        <div className={styles.wholeField}>
            <div className={styles.title}>
                {title} :
            </div>
            <div className={styles.content}>
                {Array.isArray(content) ? (
                    <ul className={styles.customList}>
                        {content.map((item, index) => (
                            <li key={index}>
                                {renderItem ? renderItem(item, index) : item}
                            </li>
                        ))}
                    </ul>
                ) : React.isValidElement(content) ? (
                    content   // 直接渲染传进来的 <ul> / <div> 等
                ) : (
                    <p>{content}</p>
                )}
            </div>
        </div>
    );
}

export default InfoBlock;