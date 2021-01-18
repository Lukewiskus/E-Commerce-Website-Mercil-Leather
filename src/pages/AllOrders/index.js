import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompleteOrderHistory } from './../../redux/Orders/orders.actions';
import OrderHistory from './../../components/OrderHistory'
import { useHistory} from 'react-router-dom';
import Button from './../../components/forms/Button'
import './styles.scss';

const mapState = ({ ordersData }) => ({
    completeOrderHistory: ordersData.completeOrderHistory.data
})

const AllOrders = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { completeOrderHistory } = useSelector(mapState);

    useEffect(() => {
        dispatch(getCompleteOrderHistory()
    );

    } , []);

    return (
        <div className="allOrdersWrap">
            <h1>
                All Orders
            </h1>
            <OrderHistory orders={completeOrderHistory}/>
            <Button className="btn goBackButton"onClick={() => history.goBack()}>
                Go Back
            </Button>
        </div>
    );
    }


export default AllOrders;