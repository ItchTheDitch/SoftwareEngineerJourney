import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                // console.log(res.data);
                const fetchedOrder = []
                for (let key in res.data) {
                    //console.log('key',key); // SADI#IJDAOIWDI#
                    //console.log('resdata[key]', res.data[key]); // {customer: {…}, deliveryMethod: "fastest", ingredients: {…}, price: "9.700000000000001"}
                    fetchedOrder.push({
                            ...res.data[key],
                            id: key
                        })
                }
                this.setState({loading:false, orders: fetchedOrder});
            })
            .catch(err => {
                this.setState({loading:false});
            } )
    }

    render() {
        return(
            <div>
                {this.state.orders.map(order =>(
                    <Order 
                        key={order.id} 
                        ingredients={order.ingredients}
                        price={order.price}
                        />
                ))}
            </div>
        );
    }
}

export default withErrorHandler (Orders, axios);