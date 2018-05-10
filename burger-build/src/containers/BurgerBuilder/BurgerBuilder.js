import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

// const DEFAULT_PRICES = {
//     totalPrice: 4
// }

class BurgerBuilder extends Component {
    // constructor (props) {
    //     super(props);
    //     this.state = {....}
    // } same as

    state = {
        ingredients : {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false

    }

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
        this.setState({purchaseable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAdditon = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAdditon;
        this.setState({totalPrice: newPrice, ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

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
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }


        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients= {this.state.ingredients} />
                <BuildControls 
                    ingredientAdded= {this.addIngredientHandler}
                    ingredientRemoved= {this.removeIngredientHandler}
                    ingredientReset={this.resetIngredientHandler}
                    disabled= {disabledInfo}
                    purchaseable={this.state.purchaseable}
                    ordered={() => this.purchaseHandler()} // this.purchaseHandler.bind(this);
                    price= {this.state.totalPrice}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;