import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io"; // Close icon

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-transform duration-300 ease-in-out scale-100 relative"
        style={{ maxHeight: "90vh", overflowY: "auto" }} // Adjust height for long content
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition-colors duration-300"
          aria-label="Close Modal"
        >
          <IoMdClose size={24} />
        </button>

        {/* Modal Content */}
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
