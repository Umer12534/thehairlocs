import React from "react";
import "./Button.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const Button = ({
  children,
  onClick,
  to = null,              // 👈 NEW
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = "left",
  fullWidth = false,
  position = "center",
  className = "",
  marginbottom = 50,
  margintop = 15,
}) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (disabled || loading) return;

    // If route exists → navigate
    if (to) {
      navigate(to);
      return;
    }

    // Otherwise normal click
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div
      className={`btn-div ${position}`}
      style={{ marginBottom: marginbottom, marginTop: margintop }}
    >
      <button
        type={type}
        onClick={handleClick}
        disabled={disabled || loading}
        className={`
          btn
          btn-${variant}
          btn-${size}
          ${fullWidth ? "btn-full" : ""}
          ${disabled || loading ? "btn-disabled" : ""}
          ${className}
        `}
      >
        {loading ? (
          <span className="btn-loader"></span>
        ) : (
          <>
            {icon && iconPosition === "left" && (
              <FontAwesomeIcon icon={icon} className="btn-icon left" />
            )}

            <span className="btn-text">{children}</span>

            {icon && iconPosition === "right" && (
              <FontAwesomeIcon icon={icon} className="btn-icon right" />
            )}
          </>
        )}
      </button>
    </div>
  );
};

export default Button;
