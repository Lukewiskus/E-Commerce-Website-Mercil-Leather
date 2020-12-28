import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { checkUserIsAdmin } from './../../Utils';
import './styles.scss';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

const AdminToolBar = props => {
    const {currentUser} = useSelector(mapState);
    const isAdmin = checkUserIsAdmin(currentUser);
    //if the user is not an admin, return null so the admin toolbar
    //dont not render
    if(!isAdmin) return null;

    return (
        <div className="adminToolBar">
            <ul>
                <li>
                    <Link to="/admin">
                        Admin
                    </Link>
                </li>
            </ul>
        </div>
        );
    }

export default AdminToolBar;