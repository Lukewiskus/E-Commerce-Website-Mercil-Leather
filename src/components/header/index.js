import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import "./styles.scss";
import { Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import { navBarDataSignedOut, navBarDataSignedIn, navBarDataAuth } from './NavbarData';
import { IconContext } from 'react-icons';
import { signOutUserStart } from './../../redux/User/user.actions'
import { selectCartItemsCount } from './../../redux/Cart/cart.selectors';
import { checkUserIsAdmin } from './../../Utils';
import * as FaIcons from "react-icons/fa";
import logo from "./../../assets/logo.png"


const mapState = (state) => ({
    currentUser: state.user.currentUser,
    totalNumCartItems: selectCartItemsCount(state)
});

const Header = props => {
    const dispatch = useDispatch();

    const { currentUser, totalNumCartItems } = useSelector(mapState);
    const [sidebar, setSideBar] = useState(false);
    const showSideBar = () => setSideBar(!sidebar);
    const isAdmin = checkUserIsAdmin(currentUser);
    const signOut = () => {
        dispatch(signOutUserStart());
    }

    return (
        <>
            <div className="header-wrapper">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <Link to="/">
                                    <img className="logo" src={logo}/>
                                </Link>
                            </td>
                            <td>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="menuBars">
                                                <Link to="#" className="menuBars">
                                                    <FaIcons.FaBars onClick={showSideBar} />
                                                </Link>
                                            </td>
                                            <td>
                                                <Link to="/about">
                                                    About
                                                </Link>
                                            </td>

                                            <td className="leatherWork">
                                                <Link className="products" to="/products">
                                                    Leather Work
                                                </Link>
                                            </td>
                                            <td className="menuBars">
                                                <Link to="/gallery" >
                                                    Gallery
                                                </Link>
                                            </td>
                                            <td>
                                                <Link to="/contact">
                                                    Contact
                                                </Link>
                                            </td>
                                            <td className="cartIcon">
                                                <Link className="cart" to="/cart" >
                                                    <FaIcons.FaShoppingCart /> ({totalNumCartItems})
                                                </Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <IconContext.Provider value={{ color: 'white' }}>

                <nav className={sidebar ? 'navMenu active' : 'navMenu'}>

                    <ul className="navMenuItems" onClick={showSideBar}>
                        <li className="navBarToggle">
                            <span className="menuBars">
                                <AiIcons.AiOutlineClose />
                            </span>
                        </li>
                        {!currentUser && [
                            <ul>

                                <li>
                                    {navBarDataSignedOut.map((item, index) => {
                                        return (
                                            <li key={index} className={item.className}>
                                                <Link to={item.path}>
                                                    {item.icon}
                                                    <span>{item.title}</span>
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </li>
                            </ul>]}
                        {currentUser && isAdmin && [
                            <ul>
                                <li>
                                    {navBarDataAuth.map((item, index) => {
                                        return (
                                            <li key={index} className={item.className}>
                                                <Link to={item.path}>
                                                    {item.icon}
                                                    <span>{item.title}</span>
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </li>
                                <li>
                                    <span className="navText" onClick={() => signOut()}>
                                        SignOut
                        </span>
                                </li>
                            </ul>
                        ]}
                        {currentUser && !isAdmin && [
                            <ul>
                                <li>
                                    {navBarDataSignedIn.map((item, index) => {
                                        return (
                                            <li key={index} className={item.className}>
                                                <Link to={item.path}>
                                                    {item.icon}
                                                    <span>{item.title}</span>
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </li>
                                <li>
                                    <span className="navText" onClick={() => signOut()}>
                                        SignOut
                        </span>
                                </li>
                            </ul>]}

                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    )
}

//the connect func was imported, and it calls the function we wrote above and thats how it functionally
//goes through the code
export default Header;