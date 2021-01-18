import galleryTypes from './gallery.types';

const INITIAL_STATE = {
    galleryImages: {},
    homepageDescription: ""
};

const galleryReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case galleryTypes.ADD_NEW_IMAGE_START:
            return{
                ...state,
                galleryImages: action.payload
            }
        case galleryTypes.SET_GALLERY: 
            return {
                ...state,
                galleryImages: action.payload
            }
        case galleryTypes.SET_HOMEPAGE_DESCRIPTION:
            return {
                ...state,
                homepageDescription: action.payload
            }
        default:
            return state;
    }
};

export default galleryReducer;