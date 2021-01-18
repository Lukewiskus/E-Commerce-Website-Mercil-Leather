import galleryTypes from './gallery.types';

export const uploadGalleryImageStart = image => ({
    type: galleryTypes.ADD_NEW_IMAGE_START,
    payload: image
});

export const fetchGalleryStart = () => ({
    type: galleryTypes.FETCH_GALLERY_IMAGE_START,
})

export const setGallery = galleryImages => ({
    type: galleryTypes.SET_GALLERY,
    payload: galleryImages
});

export const editGalleryImage = image => ({
    type: galleryTypes.CHANGE_GALLERY_IMAGE_START,
    payload: image
})

export const deleteGalleryImage = galleryImageID => ({
    type: galleryTypes.DELETE_GALLERY_IMAGE_START,
    payload: galleryImageID
})

export const fetchHomepageDescription = () => ({
    type: galleryTypes.FETCH_HOMEPAGE_DESCRIPTION
})

export const setHomepageDescription = homepageDesc => ({
    type: galleryTypes.SET_HOMEPAGE_DESCRIPTION,
    payload: homepageDesc
})

export const updateHomepageDescription = homepageDescription => ({
    type: galleryTypes.UPDATE_HOMEPAGE_DESCRIPTION,
    payload: homepageDescription
})