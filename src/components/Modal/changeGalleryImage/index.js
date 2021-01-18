  
import React from 'react';
import './styles.scss';

const ChangeGalleryImageModal = ({ hideChangeGalleryImageModal, toggleChangeGalleryImageModal, children }) => {
  if (hideChangeGalleryImageModal) return null;

  return [
    <div className="modalChangeGalleryImageOverlay" onClick={() => toggleChangeGalleryImageModal()} />,
    <div className="modalChangeGalleryImageWrap">
      <div className="modalChangeGalleryImage">
        {children}
      </div>
    </div>
  ];
}

export default ChangeGalleryImageModal;