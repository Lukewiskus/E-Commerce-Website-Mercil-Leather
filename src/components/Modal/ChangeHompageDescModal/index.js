import React from 'react';
import './styles.scss';

const ChangeHomepageDescModal = ({ hideEditHomepageDescModal, toggleEditHomepageDescModal, children }) => {
  if (hideEditHomepageDescModal) return null;

  return [
    <div className="modalChangeHomepageDescOverlay" onClick={() => toggleEditHomepageDescModal()} />,
    <div className="modalChangeHomepageDescWrap">
      <div className="modalChangeHomepageDesc">
        {children}
      </div>
    </div>
  ];
}

export default ChangeHomepageDescModal;