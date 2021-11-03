import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomepageDescription } from './../../redux/Gallery/gallery.actions';
import aboutIMG from '../../assets/about1.JPEG'
import './styles.scss';


const mapState = state => ({
    homepageDesc: state.galleryData.homepageDescription.data
});


const About = () => {

    const { homepageDesc } = useSelector(mapState);
    const dispatch = useDispatch()
    const { desc } = homepageDesc[0];

    useEffect(() => {
        dispatch(
            fetchHomepageDescription(),
            
        )
    }, []);


    return (
        <div className="aboutpage-wrapper">
            <div className="aboutpage-block1">
                <img src={aboutIMG} alt="About Ben"/>
            </div>
            <div className="aboutpage-block2">
                <h1>
                    Ben Mercil
                </h1>
                <span dangerouslySetInnerHTML={{__html: desc}} />
            </div>
        </div>
    )
}



export default About;