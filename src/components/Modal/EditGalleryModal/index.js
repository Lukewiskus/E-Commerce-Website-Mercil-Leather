  
import React from 'react';
import './styles.scss';

const EditGalleryModal = ({ hideEditModal, toggleEditGalleryModal, children }) => {
  if (hideEditModal) return null;

  return [
    <div className="modalAddGalleryImageOverlay" onClick={() => toggleEditGalleryModal()} />,
    <div className="modalAddGalleryImageWrap">
      <div className="modalAddGalleryImage">
        {children}
      </div>
    </div>
  ];
}

export default EditGalleryModal;