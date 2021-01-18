import { put } from 'redux-saga/effects';
import { firestore, firestorage } from './../../firebase/utils';
//firestore gives us access to the data in firebase


export const handleFetchGallery = () => {
    return new Promise((resolve, reject) => {
            firestore
            .collection('gallery')
            .get()
            .then(snapshot => {
                const data = [
                ...snapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                    }
                })
            ];

            resolve({ 
                data
            });
            })
            .catch(err => {
                console.log(err)
                reject(err);
        })
    })
}
export const handleFetchHomepageDesc = () => {
    return new Promise((resolve, reject) => {
            firestore
            .collection('homepageDescription')
            .get()
            .then(snapshot => {
                const data = [
                ...snapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                    }
                })
            ];

            resolve({ 
                data
            });
            })
            .catch(err => {
                console.log(err)
                reject(err);
        })
    })
}

export const handleSetImage = newurl => {

    const { url, id } = newurl;

    return new Promise((resolve, reject) => {
        //go into the firestore, go into the coolect products, go into the 
        // document, set it as the passed in product, then do a resolve if it works
        // a reject if it does not
        firestore
            .collection('gallery')
            .doc(id)
            .update({imageURL: url})
            .then(() => {
                resolve()
            })
            .catch(err => {
                reject(err);
            })
        });
    }

export const handleAddDocument = name => {
    console.log("In Handle Document")
    const emptyData = {imageURL: "",
                        Name: name}
    return new Promise((resolve, reject) => {
        //go into the firestore, go into the coolect products, go into the 
        // document, set it as the passed in product, then do a resolve if it works
        // a reject if it does not
        firestore
            .collection('gallery')
            .doc(name)
            .set(emptyData)
            .then(() => {
                resolve()
            })
            .catch(err => {
                console.log(err)
                reject(err);
            })
        });
}
export const handleUploadImage = image => {
    console.log("adsads")

    const {thisImage, id} = image;
    put(handleAddDocument(id))
    const uploadTask = firestorage.ref(`images/${id}`).put(thisImage);
    return new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
                console.log(error);
            },
            () => {
                firestorage
                    .ref('images')
                    .child(id)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url)
                        resolve(url)
                        put(handleSetImage({url, id}))                        
                    })
                    .catch(err =>{
                        console.log(err)
                        reject(err)
                })
            }
        );
    });
}
export const handleEditImage = payload => {

    const { changeGalleryImageName, changeGalleryImage, id } = payload;
    const uploadTask = firestorage.ref(`images/${changeGalleryImageName}`).put(changeGalleryImage);
    return new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {
                console.log(error);
            },
            () => {
                firestorage
                    .ref('images')
                    .child(changeGalleryImageName)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url)
                        resolve(url)
                        put(handleSetImage({url, id}))                        
                    })
                    .catch(err =>{
                        console.log(err)
                        reject(err)
                })
            }
        );
    });
}

export const handleDeleteGalleryImage = payload => {

    
    return new Promise((resolve, reject ) => {
        firestore
            .collection('gallery')
            .doc(payload)
            .delete()
            .then(() => {
            resolve();
        })
        .catch(err => {
            console.log(err)
            reject();
        })
    });
}

export const handleUpdateHomepageDesc = payload => {
    const { newHomepageDesc } = payload
    console.log(newHomepageDesc)
    return new Promise((resolve, reject) => {
        //go into the firestore, go into the coolect products, go into the 
        // document, set it as the passed in product, then do a resolve if it works
        // a reject if it does not
        firestore
            .collection('homepageDescription')
            .doc('V9KxKry4Q79NnthDuOSP')
            .update({desc: newHomepageDesc})
            .then(() => {
                resolve()
            })
            .catch(err => {
                reject(err);
            })
        });
    }
