import React, { Component } from 'react'
import { connect } from 'react-redux';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid:false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid:false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid:false,
                touched: false
            } ,
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                   options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'cheapest'
            }
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault(); 
        // console.log(this.props.ingredients);
        // console.log(this.props.price);
        this.setState({ loading: true });
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        const order = {
            ingredients : this.props.ings,
            price: this.props.totalPrice,
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(err =>{
                this.setState({ loading: false});
            });
    }

    checkValidity (value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid; // if empty > false;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        // console.log(event.target.value);
        const updatedfOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {...updatedfOrderForm[inputIdentifier]}; // name , email , zipcode , deliveryMethods

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched =true;
        updatedfOrderForm[inputIdentifier] = updatedFormElement;
        console.log(updatedFormElement);
        this.setState({orderForm: updatedfOrderForm});
        // console.log('updatedFormElement', updatedFormElement);
        // console.log('updateOrderForm', updatedfOrderForm);
        // console.log('updatedOrderForm[inputIdentifier]', updatedfOrderForm[inputIdentifier]);
        // console.log('inputIdentifer', inputIdentifier);
    }

    render () {
        const forElementsArray = [];
        for( let key in this.state.orderForm) {
            // console.log('key',key);
            // console.log('this.state.orderForm[key]',this.state.orderForm[key]);
            forElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }   

        let form = ( <form onSubmit={this.orderHandler} >
                        {forElementsArray.map(formElement=> (
                            <Input
                                key={formElement.id}
                                elementType={formElement.config.elementType} 
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                invalid={!formElement.config.valid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                valueType={formElement.id}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                            />
                        ))}
                        <Button btnType="Success" >Order</Button>
                    </form>);
        if (this.state.loading) {
            form = <Spinner/>;
        }
        return(
            <div className={classes.ContactData} >
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price:state.totalPrice
    }
};

export default connect() (ContactData);