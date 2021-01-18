import { takeLatest, put, all, call } from 'redux-saga/effects';
import galleryTypes from './gallery.types';
import { setGallery, setHomepageDescription } from './gallery.actions'
import { handleFetchGallery,handleUploadImage, handleAddDocument,handleEditImage, handleDeleteGalleryImage, handleFetchHomepageDesc,handleUpdateHomepageDesc } from './gallery.helpers';
import { auth } from './../../firebase/utils';


export function* addImage( { payload } ) {

    try{
        const timeStamp = new Date()
        yield handleUploadImage({
            ...payload,
            productAdminUserUID: auth.currentUser.uid,
            createdDate: timeStamp
        });
    } catch(err){
        //console.log(err);
    }
}


export function* onUploadGalleryImageStart() {
    yield takeLatest(galleryTypes.ADD_NEW_IMAGE_START, addImage)
}

export function* fetchGalleryImages() {
    try{
        const galleryImages = yield handleFetchGallery();
        yield put(
            setGallery(galleryImages)
        );
    } catch(err) {
        // console.log(err);
    }
}

export function* onFetchGalleryStart() {
    yield takeLatest(galleryTypes.FETCH_GALLERY_IMAGE_START, fetchGalleryImages)
}

export function* editGalleryImageSaga({ payload }) {

    console.log("In this generator funcs")
    try{
        yield handleEditImage(payload);
    } catch(err) {
        // console.log(err);
    }
}

export function* onEditGalleryImageStart() {
    yield takeLatest(galleryTypes.CHANGE_GALLERY_IMAGE_START, editGalleryImageSaga)
}

export function* deleteGalleryImage( {payload} ) {
    try{
        yield handleDeleteGalleryImage(payload);
    } 
    catch(err){
        //console.log();
    }
}

export function* onDeleteGalleryImageStart(){
    yield takeLatest(galleryTypes.DELETE_GALLERY_IMAGE_START, deleteGalleryImage)
}

export function* fetchHomepageDescription() {
    try{
        const homepageDesc = yield handleFetchHomepageDesc();
        console.log(homepageDesc)
        yield put(
            setHomepageDescription(homepageDesc)
        );
    } catch(err) {
        // console.log(err);
    }
}
export function* onFetchHomepageDescriptionStart(){
    yield takeLatest(galleryTypes.FETCH_HOMEPAGE_DESCRIPTION, fetchHomepageDescription)
}

export function* updateHomepageDesc( {payload }){
    console.log("dfgasdf")
    try{
        yield handleUpdateHomepageDesc({
            ...payload,
        });
    } catch(err){
        //console.log(err);
    }
}
export function* onSetHomepageDescriptionStart(){
    yield takeLatest(galleryTypes.UPDATE_HOMEPAGE_DESCRIPTION, updateHomepageDesc)
}
export default function* gallerySagas() {
    yield all([
        call(onUploadGalleryImageStart),
        call(onFetchGalleryStart),
        call(onEditGalleryImageStart),
        call(onDeleteGalleryImageStart),
        call(onFetchHomepageDescriptionStart),
        call(onSetHomepageDescriptionStart)
    ])
}