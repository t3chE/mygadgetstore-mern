import React from 'react';

export default function RemoveConfirmModal({ show, onConfirm, onCancel }) {
  if (!show) return null;
  return (
    <div className="remove-modal-overlay">
      <div className="remove-modal-box">
        <p>Are you sure you want to remove this item?</p>
        <div className="remove-modal-actions">
          <button className="confirm-btn" onClick={onConfirm}>Yes</button>
          <button className="cancel-btn" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
}
