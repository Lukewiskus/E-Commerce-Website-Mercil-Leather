import React, {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactDOM from 'react-dom'
import Ben from './../../assets/benFace.jpg';
import Carousel from 'react-elastic-carousel';
import { fetchGalleryStart, fetchHomepageDescription } from './../../redux/Gallery/gallery.actions'
import './styles.scss';

const mapState = state => ({
    gallery: state.galleryData.galleryImages.data,
    homepageDesc: state.galleryData.homepageDescription.data
});

const HomePage = () => {
    const { gallery,homepageDesc } = useSelector(mapState);
    const dispatch = useDispatch()
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
        <div className="homepageWrapper">
            <table border="0" cellPadding="10" cellSpacing="10">
                <tbody>
                    <tr className="row1">
                        <td className="imageOfBen">
                            <img className="profileImage"src={Ben} />
                            {Array.isArray(homepageDesc) && homepageDesc.map(homepageDesc => 
                                <p>
                                    <span dangerouslySetInnerHTML={{__html: homepageDesc.desc}} />
                                </p>
                            )}
                        </td>
                    </tr>
                    <tr className="row2">
                    <div className="carouselWrapper">
                    <Carousel className="carousel">
                        {Array.isArray(gallery) && gallery.map(galleryItem => 
                        <div key={galleryItem}>
                            <img className="carouselImage" src={galleryItem.imageURL} />
                        </div>)}
                    </Carousel>
                    </div>
                    </tr>
                    <tr className="row3">
                    <div className="contactMeHomepage">
                        <ul>
                            <li>
                                <h1>
                                    Interested In Something Custom? Contact Me At
                                </h1>
                            </li>
                            <li>
                                555-555-5555
                            </li>
                            <li>
                                exampleEmail@email.com
                            </li>
                            <li>
                                Instagram, Facebook, ect..
                            </li>
                        </ul>
                    </div>
                    </tr>
                </tbody>
            </table>
            
        </div>

    )
}
export default HomePage;