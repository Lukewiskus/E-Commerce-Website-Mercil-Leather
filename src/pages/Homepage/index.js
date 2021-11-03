import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import ReactDOM from 'react-dom'
import Ben from './../../assets/benFace.jpg';
import Carousel from 'react-elastic-carousel';
import { fetchGalleryStart, fetchHomepageDescription } from './../../redux/Gallery/gallery.actions'
import './styles.scss';
import Button from "./../../components/forms/Button";
import home1 from '../../assets/home1.jpg';
import home2 from '../../assets/home2.jpg';
import home3 from '../../assets/home3.JPEG';
import home4 from '../../assets/gallery4.JPG';

const mapState = state => ({
    gallery: state.galleryData.galleryImages.data,
    homepageDesc: state.galleryData.homepageDescription.data
});

const HomePage = () => {
    const { gallery, homepageDesc } = useSelector(mapState);
    const dispatch = useDispatch()
    const history = useHistory();
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
    
    return (
<div className="homepage-wrapper">
            <div className="homepage-block-1">
                <img src={home2} alt="Main of Ben"/>
            </div>
            <div className="homepage-block-2">
                <div className="tile">
                    <img src={home3} alt="tile 2"/>
                    <h3>About Ben Mercil</h3>
                    <p>
                        Test words for test fun time
                        Test words for test fun time
                        Test words for test fun time
                        Test words for test fun time
                        Test words for test fun time
                    </p>
                    <Button onClick={() => { history.push('/about') }}>
                        About
                    </Button>
                </div>
                <div className="tile">
                <img src={home4} alt="tile 1"/>
                    <h3>Ben's Leatherwork</h3>
                    <p>
                    Test words for test fun time
                    Test words for test fun time
                    Test words for test fun time
                    Test words for test fun time
                    Test words for test fun time
                    </p>
                    <Button onClick={() => { history.push('/gallery')}}>
                        Gallery
                    </Button>
                </div>
                
            </div>
            <div className="homepage-block-3">
                <img src={home1} alt="last one of ben"/>
                </div>
        </div>
    )
}

export default HomePage;