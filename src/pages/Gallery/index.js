import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGalleryStart } from './../../redux/Gallery/gallery.actions'

import gallery1 from '../../assets/iCloud Photos from Benjamin Mercil/gallery1.jpg';
import gallery2 from '../../assets/iCloud Photos from Benjamin Mercil/gallery2.jpg';
import gallery3 from '../../assets/iCloud Photos from Benjamin Mercil/gallery3.jpg';
import gallery4 from '../../assets/iCloud Photos from Benjamin Mercil/gallery4.JPG';
import gallery5 from '../../assets/iCloud Photos from Benjamin Mercil/gallery5.jpg';
import gallery6 from '../../assets/iCloud Photos from Benjamin Mercil/gallery6.jpg';
import gallery7 from '../../assets/iCloud Photos from Benjamin Mercil/gallery7.jpg';
import { Link } from 'react-router-dom'
import './styles.scss';

const mapState = state => ({
    gallery: state.galleryData.galleryImages.data,
});

const Gallery = () => {
    const { gallery, homepageDesc } = useSelector(mapState);
    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(
            fetchGalleryStart(),

        )
    }, []);

    return (
        <div className="gallery-wrapper">
            {Array.isArray(gallery) && gallery.map(galleryItem =>
                <div key={galleryItem}>
                <img src={galleryItem.imageURL}/>
                </div>
            )}
        </div>
    )
}

export default Gallery;