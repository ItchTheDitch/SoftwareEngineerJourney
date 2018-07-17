import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import * as burgerBuilderActions from '../../store/actions'



// const DEFAULT_PRICES = {
//     totalPrice: 4
// }

class BurgerBuilder extends Component {
    // constructor (props) {
    //     super(props);
    //     this.state = {....}
    // } same as

    state = {
        purchaseable: false,
        purchasing: false,
        loading : false,
        error: false

    }

    componentDidMount () {
        console.log(this.props)
        axios.get('https://my-burger-react-5d39a.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({error: true});
            });
    }
    // purchaseHandler = () => {} // this.purchaseHandler()
    purchaseHandler () {
        this.setState({purchasing:true});
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients) // [salad,bacon,meat,cheese]
                    .map(igkey => {
                        return ingredients[igkey] // 2 3 3 4
                    })
                    .reduce((sum, el) => {
                        return sum + el; // el = 2 3 3 4
                    },0);
       return sum > 0 ;
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAdditon = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAdditon;
    //     this.setState({totalPrice: newPrice, ingredients:updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0 ) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({totalPrice: newPrice, ingredients:updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // resetIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount - oldCount;
    //     const defaultIngredients = {
    //         ...this.state.ingredients
    //     };
    //     defaultIngredients[type] = updatedCount;

    //     const defaultPrice = {
    //         ...this.state.price
    //     };
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice =(oldPrice - oldPrice) + defaultPrice[type];
    //     console.log('pricedefault',newPrice);
    //     this.setState({totalPrice:newPrice, ingredients:defaultIngredients});
    // }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    };

    purchaseContinueHandler = () => {
        // const queryParams = [];
        // for(let i in this.state.ingredients) {
        //     queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.state.ingredients[i])}`);
        // }
        // queryParams.push(`price=${this.state.totalPrice}`);
        // const queryString = queryParams.join('&')
        // this.props.history.push({
        //     pathname : '/checkout',
        //     search : `?${queryString}`
        // });
        this.props.history.push('./checkout');
    };

    render() {

        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;

    

        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if(this.props.ings) {
             burger = (
                <Aux>
                    <Burger ingredients= {this.props.ings} />
                    <BuildControls 
                        ingredientAdded= {this.props.onIngredientAdded}
                        ingredientRemoved= {this.props.onIngredientRemoved}
                        disabled= {disabledInfo}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        ordered={() => this.purchaseHandler()} // this.purchaseHandler.bind(this); // this.purchaseHandler() --> if u declare as property
                        price= {this.props.price}
                    />
                 </Aux>
                );
                orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price}
                />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName))
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler (BurgerBuilder, axios));