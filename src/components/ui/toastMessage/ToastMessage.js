import React, { useEffect, useState } from "react";
import "./ToastMessage.css";

const ToastMessage = ({ type = "success", message, duration = 3000, onClose }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (message) {
        setShow(true);
        const timer = setTimeout(() => {
            setShow(false);
            if (onClose) onClose();
        }, duration);
        return () => clearTimeout(timer);
        }
    }, [message, duration, onClose]);

    if (!message) return null;

    return (
        <div className={`toast-message ${type} ${show ? "show" : ""}`}>
        {message}
        </div>
    );
};

export default ToastMessage;
