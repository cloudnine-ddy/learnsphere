import React, {useState} from "react";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

import styles from "./CreateLessons.module.css";

function CreateLessons() {
  console.log("help")
  const navigate = useNavigate();
  const [lessonID, setlessonID] = useState("");
  const [lessonTitle, setlessonTitle] = useState("");
  const [lessonDesc, setlessonDesc] = useState("");
  const [lessonReadList, setlessonReadList] = useState("")
  const [lessonPrereq, setlessonPrereq] = useState("")
  const [lessonCP, setlessonCP] = useState("")
  const [lessonInstruct, setlessonInstruct] = useState("")
  const [lessonStatus, setlessonStatus] = useState("");
  const [errorMessages, setErrorMessages] = useState([])

  const submitForm = (e) => {
    e.preventDefault();
    let message = []


    if ((!lessonID.match(/^\d+$/)) || (!lessonID.match(/^\d+$/)) || (!lessonTitle.match(/^\d+$/)) ||
    (!lessonDesc.match(/^\d+$/)) ||(!lessonReadList.match(/^\d+$/))||
    (!lessonPrereq.match(/^\d+$/)) ||(!lessonCP.match(/^\d+$/))
    (!lessonInstruct.match(/^\d+$/))||(!lessonStatus.match(/^\d+$/))){
      message.push("Do not put spaces in the fields!")
    }

    if (message.length > 0) {
      setErrorMessages(message);
      return;
    }
    console.log("lesson created successfully!")
    navigate("/lesson");
    setErrorMessages([]);
    console.log(lessonID,lessonTitle,lessonDesc,lessonDesc,errorMessages)
  }

  return (
      <form onSubmit={submitForm} className={styles.infoFooter}>
        <div className={styles.infoSection}>
          <div className={styles.infoHeader}>
            <h1 className={styles.infoTitle}>Login</h1>
          </div>

          <div className={styles.infoScroll}>
            <InputField label="Email" id="email" placeholder="Enter email" value = {email} onChange={(e) => setEmail(e.target.value)}   />
            <PasswordField label="Password" id="password" placeholder="Enter password"  value={password} onChange={(e) => setPassword(e.target.value)} />

            {errorMessages.length>0 && (
                <div>
                  {errorMessages.map((msg,idx) => (
                      <p key = {idx} style={{ color: "red"}}>
                        {msg}
                      </p>
                  ))}
                </div>
            )}

          </div>

          <div className={styles.infoFooter}>
            <Button type="submit">Login</Button>
          </div>
        </div>
      </form>
  );
}

export default CreateLessons;
