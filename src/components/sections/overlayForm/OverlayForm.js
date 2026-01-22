import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const OverlayForm = ({
    title,
    fields,
    formData,
    setFormData,
    onSubmit,
    onClose,
    loading,
    submitText = "Submit",
    }) => {
    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="admin-overlay">
        <div className="admin-overlay-content">
            <button className="btn-close" onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
            </button>

            <h2>{title}</h2>

            <form onSubmit={onSubmit}>
            {fields.map((field) => (
                <div key={field.name}>
                <label>{field.label}</label>

                {field.type === "textarea" ? (
                    <textarea
                    value={formData[field.name]}
                    onChange={(e) =>
                        handleChange(field.name, e.target.value)
                    }
                    placeholder={field.placeholder}
                    />
                ) : (
                    <input
                    type={field.type}
                    value={formData[field.name]}
                    onChange={(e) =>
                        handleChange(field.name, e.target.value)
                    }
                    placeholder={field.placeholder}
                    required={field.required}
                    />
                )}
                </div>
            ))}

            <div className="overlay-actions">
                <button type="submit" disabled={loading}>
                {loading ? "Saving..." : submitText}
                </button>
                <button type="button" className="btn-cancel" onClick={onClose}>
                Cancel
                </button>
            </div>
            </form>
        </div>
        </div>
    );
};

export default OverlayForm;
