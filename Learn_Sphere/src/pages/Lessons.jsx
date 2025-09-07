import React, { useState, useEffect } from "react";
import { getLessons } from "../components/getLessons";

function Lessons()
{
    var [lessons, setLessons] = useState([]);

    useEffect(() => {
        getLessons().then((res) => {
            setLessons(res);
        })
        .catch(error => "error: ${error}");
    }, [lessons]);    

    return (
        <ul>
            {lessons.map((item) => 
            <div id={item.lessonID}>
                <h1>{item.lessonID}</h1>
                <p>{item.title}</p>
            </div>)}
        </ul>
    )
}

export default Lessons;