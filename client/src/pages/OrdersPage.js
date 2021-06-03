import React, {useState, useEffect} from 'react';
import { db } from '../firebase';
import { useStateValue } from "../data/StateProvider";
import './OrdersPage.css';
import Order from '../components/Order'

function OrdersPage() {
    const [{basket, user}, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if(user){
            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('created', 'desc')
            .onSnapshot(snapshot => {
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
                console.log(user?.id,orders)
            })
        } else {
            setOrders([])
            console.log(orders)
        }    
    }, [user, orders])

    return (
        <div className='orders'>
            <h1> Your Orders</h1>

            <div className="orders_order">
                {
                    orders?.map(order => (
                        <Order order={order} />
                    ))
                }
            </div>
        </div>
    )
}

export default OrdersPage
