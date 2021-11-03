import React, { useEffect, useState } from 'react';
import EditGalleryModal from './../../components/Modal/EditGalleryModal'
import ChangeGalleryImageModal from '../../components/Modal/changeGalleryImage'
import ChangeHomepageDescModal from './../../components/Modal/ChangeHompageDescModal'
import FormInput from './../../components/forms/FormInput'
import Carousel from 'react-elastic-carousel';
import Button from './../../components/forms/Button'
import { fetchGalleryStart, uploadGalleryImageStart, editGalleryImage, deleteGalleryImage, fetchHomepageDescription, updateHomepageDescription } from './../../redux/Gallery/gallery.actions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory} from 'react-router-dom';
import CKEditor from 'ckeditor4-react';
import './styles.scss'




const mapState = state => ({
    gallery: state.galleryData.galleryImages.data,
    homepageDesc: state.galleryData.homepageDescription.data
});

const EditHomepage = () => {
    const { gallery, homepageDesc } = useSelector(mapState);
    const dispatch = useDispatch()
    const history = useHistory()
    const [newGalleryImage, setNewGalleryImage] = useState(null)
    const [changeGalleryImage, setChangeGalleryImage] = useState(null)
    const [changeGalleryImageName, setChangeGalleryImageName] = useState("")
    const [imageName, setImageName] = useState("")
    const [hideEditModal, setHideEditModal] = useState(true) 
    const [hideChangeGalleryImageModal, setHideChangeGalleryImageModal] = useState(true)
    const [hideEditHomepageDescModal, setEditHomepageDescModal] = useState(true)
    const [homepageDescription, setHomepageDescription] = useState("")
    const {desc} = homepageDesc[0];

    
    useEffect(() => {
        
        dispatch(
            fetchGalleryStart(),
            
        )
    }, []);
    useEffect(() => {
        dispatch(
            fetchHomepageDescription(),
            
        )
    }, []);

    const toggleEditGalleryModal = () => {
        setHideEditModal(!hideEditModal)
    }

    const toggleEditHomepageDescModal = () => {
        setEditHomepageDescModal(!hideEditHomepageDescModal)
    }
    
    const toggleChangeGalleryImageModal = () => {
        setHideChangeGalleryImageModal(!hideChangeGalleryImageModal)
    }

    const configEditGalleryModal = {
        hideEditModal,
        toggleEditGalleryModal
    };
    const configEditHomepageModal = {
        hideEditHomepageDescModal,
        toggleEditHomepageDescModal
    }
    const configChangeGalleryImageModal = {
        hideChangeGalleryImageModal,
        toggleChangeGalleryImageModal
    }
    const handleChangeImageSubmit = e =>{
        e.preventDefault();
        dispatch(editGalleryImage({
            changeGalleryImageName: changeGalleryImageName,
            changeGalleryImage: changeGalleryImage,
            id: changeGalleryImageName
        }))
        setTimeout(() => {  dispatch(fetchGalleryStart()
            ) }, 2000);
        toggleChangeGalleryImageModal()

    }
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(uploadGalleryImageStart({
            thisImage: newGalleryImage,
            id: newGalleryImage.name
        }))
        setTimeout(() => {  dispatch(fetchGalleryStart()
        ) }, 1000);
        toggleEditGalleryModal(!hideEditModal)
    }

    const handleChangeImageButton = e => {
        toggleChangeGalleryImageModal()
        setChangeGalleryImageName(e)
    }
    const handleDelete = e => {
        dispatch(deleteGalleryImage(e));
        setTimeout(() => {  dispatch(fetchGalleryStart()) }, 1000);
    }
    const handleHompageDescSubmit = e => {
        e.preventDefault();
        console.log(homepageDescription)
        dispatch(updateHomepageDescription({
            newHomepageDesc: homepageDescription
        }))
        setTimeout(() => {  dispatch(fetchHomepageDescription()
            ) }, 1000);
        toggleEditHomepageDescModal()
    }
  return (
      
    <div className="editHomepageWrapper">
        <Button onClick={() => history.goBack()}>
            Go Back
        </Button>
        <h1>
            Edit Gallery Images
        </h1>
        <Button onClick={() => toggleEditGalleryModal()}>
            Add Image   
        </Button>
        <ChangeGalleryImageModal {...configChangeGalleryImageModal}>
            <h1>Change Gallery Image</h1>
            <form onSubmit={handleChangeImageSubmit}>
            <input className="uploadBTN" required type="file" onChange={e => setChangeGalleryImage(e.target.files[0])}/>
                    <Button type="submit">
                        Submit Change
                    </Button>
            </form>
        </ChangeGalleryImageModal>
        <ChangeHomepageDescModal {...configEditHomepageModal}>
            <form onSubmit={handleHompageDescSubmit}>
            <h1>
                Edit Homepage
            </h1>
            <CKEditor
            required
            data={desc}
            //on a change, use the setter we made, and the evt.editor.getData() is from the dependicy itself
            onChange={evt => setHomepageDescription(evt.editor.getData())}
            />
            <Button type="submit">
                Submit Change
            </Button>
            </form>
        </ChangeHomepageDescModal>
        <EditGalleryModal {...configEditGalleryModal}>
            <div>
                <form onSubmit={handleSubmit}>
                    <h1>
                        Add Image
                    </h1>
                    <input className="uploadBTN" required type="file" onChange={e => setNewGalleryImage(e.target.files[0])}/>
                    <Button type="submit">
                        Submit Change
                    </Button>
                </form>
            </div>
        </EditGalleryModal> 
        <div className="galleryImages">
            <table>
                <tbody>
                {Array.isArray(gallery) && gallery.map((galleryImage, indexCount) => 
                <tr key={galleryImage.id}>
                    <td>
                        {indexCount + 1}
                    </td>
                    <td>
                        <img src={galleryImage.imageURL} />
                    </td>
                    <td>
                        <Button onClick={() => handleChangeImageButton(galleryImage.Name)}>
                            Change Image
                        </Button>
                    </td>
                    <td>
                        <Button onClick={e => handleDelete(galleryImage.Name)} >
                            Delete Image
                        </Button>
                    </td>
                </tr>)}
                </tbody>
            </table>            
        </div>
        <div className="editHomepageDesc">
            <h1 className="editHomepageDesch1">
                Edit About Description
            </h1>
            <span dangerouslySetInnerHTML={{__html: desc}} />
                
            <Button onClick={() => toggleEditHomepageDescModal()}>
                Edit Description
            </Button>
        </div>
        
    </div>
  )

}

export default EditHomepage;