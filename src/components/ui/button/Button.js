import React from "react";
import "./Button.css";


const Button = ({
  children,
  onClick,
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
  marginbottom=50,
  margintop= 15
}) => {
  return (
    <div className={`btn-div ${position}`} style={{marginBottom: marginbottom, marginTop: margintop}}>
      <button
        type={type}
        onClick={onClick}
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
              <span className="btn-icon left">{icon}</span>
            )}

            <span className="btn-text">{children}</span>

            {icon && iconPosition === "right" && (
              <span className="btn-icon right">{icon}</span>
            )}
          </>
        )}
      </button>
    </div>
    
  );
};

export default Button;
