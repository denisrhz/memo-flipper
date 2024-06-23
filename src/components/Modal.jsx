// Modal.js
import React from "react"
import { useSelector } from "react-redux"

const Modal = ({ show, onClose, children }) => {
  const attempts = useSelector((state) => state.data.attempts)
  if (!show) {
    return null
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h2>Congrats! You win!</h2>
          <button onClick={onClose} className="close-button">
            &times;
          </button>
        </div>
        <div className="modal-body">{`You did ${attempts} attempts! Next time will be better!`}</div>
      </div>
    </div>
  )
}

export default Modal
