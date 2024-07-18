/* eslint-disable react/prop-types */

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
    <div className="modal">
      <div className="modal-header">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="modal-content">
        {children}
      </div>
    </div>
  </div>
);
};

export default Modal;
