import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImageStart, addProductStart, fetchProductsStart, deleteProductStart, setProducts } from './../../redux/Products/products.actions.js'
import AddProductModal from './../../components/Modal/AddProductModal';
import { Link, useHistory, useParams } from 'react-router-dom';

import FormInput from './../../components/forms/FormInput';
import FormSelect from './../../components/forms/FormSelect';
import Button from './../../components/forms/Button';
import LoadMore from './../../components/Loadmore';
import CKEditor from 'ckeditor4-react';
import './styles.scss';

const mapState = ({ productsData, user }) => ({
    products: productsData.products,
    doucmentID: productsData,
    currentUser: user.currentUser
});

const Admin = props => {
    const { products, documentID } = useSelector(mapState);
    const dispatch = useDispatch();
    const history = useHistory();
    const { currentUser } = useSelector(mapState);
    const [hideProductModal, setHideProductModal] = useState(true);
    const [image, setImage] = useState(null)
    const { filterType } = useParams();
    const [productCategory, setProductCategory] = useState('');
    const [productName, setProductName] = useState('');
    const [productThumbnail, setProductThumbnail] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [productDescription, setProductDescription] = useState('');
    const { data, queryDoc, isLastPage } = products;


    useEffect(() => {
        dispatch(fetchProductsStart({ filterType })
        )
        return () => {
            dispatch(setProducts([]))
        }
    }, [filterType]);

    useEffect(() => {
        console.log(filterType);
        dispatch(fetchProductsStart({ filterType })
        )
        return () => {
            dispatch(setProducts([]))
        }
    }, [filterType]);
    
    const toggleProductModal = ( ) => {
        setHideProductModal(!hideProductModal);
    }
    const configProductModal = {
        hideProductModal,
        toggleProductModal
    };

    const resetForm = () => {
        setHideProductModal(true);
        setProductCategory('');
        setProductName('');
        setProductPrice(0);
        setProductDescription('');
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(
            addProductStart({
            productCategory,
            productName,
            productPrice,
            productThumbnail,
            productDescription,
        })
        );
        dispatch(uploadImageStart({
            thisImage: image,
            name: image.name,
            id: productName
        }))        
        setTimeout(() => {  dispatch(fetchProductsStart({ filterType })
        ) }, 1000);
        resetForm()
    }
    const handleFilter = (e) => {
        const nextFilter = e.target.value;
        history.push(`/admin/${nextFilter}`);
    };

    const configFilters = {
        defaultValue: filterType,
          options: [{
            name: 'Show All',
            value: ''
          }, {
            name: 'Wallet',
            value: 'Wallet'
          }, {
          name: 'Tote Bags',
          value: 'Tote-Bags'
          }, {
          name: 'Guitar Straps',
          value: 'Guitar-Straps'
          }, {
          name: 'Belts',
          value: 'Belts'
      }, {
          name: 'Other',
          value: 'Other'
      }], handleChange: handleFilter
      };

    const handleLoadMore = () => {
        dispatch(
            fetchProductsStart({
                filterType,
                startAfterDoc: queryDoc, 
                presistProducts: data
            })
        );
    };

    const configLoadMore = {
        onLoadMoreEvt: handleLoadMore
    };

    

    return(
            <div className="mainWrap">
                <div className="topWrap">
                    <h1>
                        Hello {currentUser.displayName}
                    </h1>
                </div>
                <AddProductModal className="addProductModal" {...configProductModal}>
                 <div className="addNewProductForm">
                     <form onSubmit={handleSubmit}>
                         <h2>
                             Add new product
                         </h2>
                         <FormSelect
                            required
                            label="Category"
                            options = {[
                            {   value: '',
                                name: "Select Category"
                            }, {
                                value: "Wallet",
                                name: "Wallet"
                            }, {
                                value: "Guitar-Straps",
                                name: "Guitar Straps"
                            }, {
                                value: "Tote-Bags",
                                name: "Tote Bags"
                            }, {
                                value: "Belts",
                                name: "Belts"
                            }, {
                                value: "Other",
                                name: "Other"
                            }]}
                            handleChange={e => setProductCategory(e.target.value)}
                            />
                            
                            <FormInput
                            required
                            label="Name"
                            type="text"
                            value={productName}
                            handleChange={e => setProductName(e.target.value)}
                            />
                            
                            <h2 className="AddProductText">Image For Thumbnail</h2>
                            <input className="uploadBTN"required type="file" onChange={e => setImage(e.target.files[0])} />

                           <FormInput 
                           required
                                label="Price"
                                type="number"
                                min="0.00"
                                max="10000.00"
                                step="1"
                                value={productPrice}
                                handleChange={e => setProductPrice(e.target.value)}
                            />

                            <h2 className="AddProductText">Product Description</h2>
                            <CKEditor
                            required
                            //on a change, use the setter we made, and the evt.editor.getData() is from the dependicy itself
                            onChange={evt => setProductDescription(evt.editor.getData())}
                            />
                            <Button type="submit">
                                Add product
                            </Button> 
                    </form>
                </div>
            </AddProductModal>
                <div className="lowWrap">
                <table className="topButtons">
                    <tbody>
                        <tr>
                            <td>
                            <Button className="btn addProduct"onClick={() => toggleProductModal()}>
                                 Add new product
                            </Button>
                            </td>
                            <td>
                            <Link to={'all-orders'}>
                            <Button className="btn addProduct">

                                View All Orders
                            </Button>
                            </Link>
                            </td>
                            <td>
                            <Link to={'edit-homepage'}>
                            <Button className="btn addProduct">
                                Edit Homepage
                            </Button>
                            </Link>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <h1>
                Filter Your Products:
                </h1>
                <FormSelect {...configFilters} />
                    <table border="0" cellPadding="0" cellSpacing="0">
                        <tbody>
                            <tr>
                                <td>
                                <table className="product" border="0" cellPadding="10" cellSpacing="10" margin={0}>
                                <tbody>
                                    {(Array.isArray(data) && data.length >0) && data.map((product, index) => {
                                        const { 
                                            productName,
                                            productThumbnail,
                                            productPrice,
                                            productCategory,
                                            documentID
                                        } = product;
                                        return (
                                            <div className="singleRow">
                                            <tr key={index}>
                                                <td>
                                                    <img src={productThumbnail} alt="Thumbnail"/>
                                                </td>
                                                <td>
                                                    {productName}
                                                </td>
                                                <td>
                                                    ${productPrice}
                                                </td>
                                                <td>
                                                    {productCategory}
                                                </td>
                                                <td>
                                                <Link to={`/productedit/${documentID}`}>
                                                    <Button >
                                                        Edit
                                                    </Button>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Button onClick={() => dispatch(deleteProductStart(documentID))}>
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                            </div>
    
                                        )
                                    })}
                                </tbody>
                                {!isLastPage && (<LoadMore {...configLoadMore}/>)}
                                </table>
                            </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>

        //     <div className="manageProducts">
        //         <table border="0" cellPadding="0" cellSpacing="0">
        //             <tbody> 
        //                 <tr>
        //                     <td>
        //                         <table className="results" border="0" cellPadding="10" cellSpacing="10">
        //                             <tbody>
        //                                 {(Array.isArray(data) && data.length >0) && data.map((product, index) => {
        //                                     const { 
        //                                         productName,
        //                                         productThumbnail,
        //                                         productPrice,
        //                                         productCategory,
        //                                         documentID
        //                                     } = product;
        //                                     return (
        //                                         <div className="singleRow">
        //                                         <tr key={index}>
        //                                             <td>
        //                                                 <img src={productThumbnail} alt="Thumbnail"/>
        //                                             </td>
        //                                             <td>
        //                                                 {productName}
        //                                             </td>
        //                                             <td>
        //                                                 ${productPrice}
        //                                             </td>
        //                                             <td>
        //                                                 {productCategory}
        //                                             </td>
        //                                             <td>
        //                                                 <Button onClick={() => dispatch(deleteProductStart(documentID))}>
        //                                                     Delete
        //                                                 </Button>
        //                                             </td>
        //                                             <td>
        //                                             <Link to={`/productedit/${documentID}`}>
        //                                                 <Button >
        //                                                     Edit
        //                                                 </Button>
        //                                                 </Link>
        //                                             </td>
        //                                         </tr>
        //                                         </div>
        
        //                                     )
        //                                 })}
        //                             </tbody>
        //                             {!isLastPage && (
        //                                 <LoadMore {...configLoadMore}/>
        //                             )}
        //                         </table>
        //                     </td>
        //                 </tr>
        //             </tbody>
                
        //         </table>
        //     </div>
        // </div>
        // </div>
    );
}

export default Admin;