import React, { useEffect } from 'react';
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
    const { gallery, homepageDesc } = useSelector(mapState);
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
            <table>
                <tbody>
                    <tr>
                        <td>
                            <img className="profileImage" src={Ben} />
                        </td>
                        <td>
                            {Array.isArray(homepageDesc) && homepageDesc.map(homepageDesc =>
                                <p>
                                    <span dangerouslySetInnerHTML={{ __html: homepageDesc.desc }} />
                                </p>
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="carouselWrapper">
                <Carousel className="carousel">
                    {Array.isArray(gallery) && gallery.map(galleryItem =>
                        <div key={galleryItem}>
                            <img className="carouselImage" src={galleryItem.imageURL} />
                        </div>)}
                </Carousel>
            </div>
        </div>

    )
}
export default HomePage;