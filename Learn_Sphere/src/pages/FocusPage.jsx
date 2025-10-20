import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import styles from "./FocusPage.module.css";

import Button from "../components/clickable/Button";
import GrowthSection from "../components/functional/GrowthSection";

const confirmationPhrase = "I really really really want to give up my focus";

function FocusPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const rawDuration = searchParams.get("duration");
  const parsed = Number(rawDuration);
  const focusMinutes =
    Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 25;
  const totalSeconds = focusMinutes * 60;

  const [remainingTime, setRemainingTime] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [showGiveUpPrompt, setShowGiveUpPrompt] = useState(false);
  const [confirmationInput, setConfirmationInput] = useState("");
  const [confirmationError, setConfirmationError] = useState("");

  const progress = ((totalSeconds - remainingTime) / totalSeconds) * 100;

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    if (isRunning && remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isRunning, remainingTime]);

  useEffect(() => {
    setRemainingTime(totalSeconds);
    setIsRunning(true);
    setTasks([]);
    setTaskInput("");
    setShowGiveUpPrompt(false);
    setConfirmationInput("");
    setConfirmationError("");
  }, [totalSeconds]);

  const handleTaskSubmit = (event) => {
    event.preventDefault();
    const trimmed = taskInput.trim();
    if (!trimmed) {
      return;
    }
    setTasks((prev) => [...prev, { id: Date.now(), text: trimmed }]);
    setTaskInput("");
  };

  const handleRemoveTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const openGiveUpPrompt = () => {
    setShowGiveUpPrompt(true);
    setConfirmationInput("");
    setConfirmationError("");
  };

  const closeGiveUpPrompt = () => {
    setShowGiveUpPrompt(false);
    setConfirmationInput("");
    setConfirmationError("");
  };

  const handleGiveUpConfirm = () => {
    if (confirmationInput.trim() === confirmationPhrase) {
      setShowGiveUpPrompt(false);
      navigate("/home");
      return;
    }

    setConfirmationError(
      "That phrase does not match. Please type it exactly or stay focused."
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <aside className={styles.tasksPanel}>
          <h2 className={styles.tasksTitle}>Focus tasks</h2>
          <form className={styles.taskForm} onSubmit={handleTaskSubmit}>
            <input
              type="text"
              className={styles.taskInput}
              value={taskInput}
              onChange={(event) => setTaskInput(event.target.value)}
              placeholder="Add a task you want to tackle"
              aria-label="Task to focus on"
            />
            <button type="submit" className={styles.addButton} aria-label="Add task">
              +
            </button>
          </form>
          <ul className={styles.taskList}>
            {tasks.length === 0 && (
              <li className={styles.emptyState}>
                No tasks yet. Add something to stay on track.
              </li>
            )}
            {tasks.map((task) => (
              <li key={task.id} className={styles.taskItem}>
                <span className={styles.taskText}>{task.text}</span>
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => handleRemoveTask(task.id)}
                  aria-label={`Remove task ${task.text}`}
                >
                  -
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <div className={styles.focusPanel}>
          <div className={styles.timeQuoteContainer}>
            <p className={styles.time}>{formatTime(remainingTime)}</p>
            <p className={styles.quote}>Live a life you will remember.</p>
          </div>
          <div className={styles.growthSectionContainer}>
            <GrowthSection progress={progress} />
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <Button label="Give Up" type="button" onClick={openGiveUpPrompt} />
      </div>
      {showGiveUpPrompt && (
        <div className={styles.overlay} role="dialog" aria-modal="true">
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Ready to step away?</h3>
            <p className={styles.modalMessage}>
              Type{" "}
              <span className={styles.modalPhrase}>
                "{confirmationPhrase}"
              </span>{" "}
              to confirm you want to leave focus mode.
            </p>
            <input
              type="text"
              value={confirmationInput}
              onChange={(event) => setConfirmationInput(event.target.value)}
              className={styles.modalInput}
              placeholder={confirmationPhrase}
              aria-label="Confirmation phrase"
            />
            {confirmationError && (
              <p className={styles.modalError}>{confirmationError}</p>
            )}
            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={closeGiveUpPrompt}
              >
                Stay Focused
              </button>
              <button
                type="button"
                className={styles.confirmButton}
                onClick={handleGiveUpConfirm}
              >
                Give Up Focus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FocusPage;
