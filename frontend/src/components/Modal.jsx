import React, { useEffect } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  // Close modal when the Escape key is pressed
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // Close modal when clicking outside of the modal content
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white p-6 rounded-md shadow-md w-96 relative transform transition-all duration-300"
        style={{
          transform: isOpen ? "scale(1)" : "scale(0.8)",
          opacity: isOpen ? 1 : 0,
        }}
      >
        {/* Close Icon */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
