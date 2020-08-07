import React, { useState, useEffect } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import SummaryForm from '../AddressForm/SummaryForm';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Dialog, Button, Backdrop } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { v4 as uuidv4 } from 'uuid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import CartProducts from './CartProducts';
import FormDialog from '../AddressForm';
import { sendPhoneMessage, paytmIntegration } from '../../Helpers/SendConfirmation';
import paytmSecureServerPost from '../../Helpers/PaytmIntegration';

const useStyles = makeStyles((theme) => ({
    alertRoot: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const Cart = ({ homeClick, COD, ...other }) => {

    const [inputQuantityValue, setInputQuantityValue] = useState({})
    const [totalCartProducts, setTotalCartProducts] = useState(other)
    const [totalPrice, setTotalPrice] = useState(0)
    const [currentButtonValue, setCurrentButtonValue] = useState('Add Address')
    const [isForm, setIsForm] = useState(false)
    const [formDetails, setFormDetails] = useState([])
    const [loader, setLoader] = useState(false)
    const [isSummary, setIsSummary] = useState(false)
    const [apiResp, setApiResp] = useState({ alertFlag: false, alertMessage: '', alertText: '', alertBoldText: '' })
    const [radioValue, setRadioValue] = useState(null)

    const classes = useStyles();

    useEffect(() => {
        const addressValue = localStorage && localStorage.getItem('addressDetails')
        if (addressValue) {
            setFormDetails(JSON.parse(addressValue))
            setCurrentButtonValue('Edit Address')
        }
        return () => {
            setTotalPrice(0)
            setInputQuantityValue({})
            setTotalCartProducts(other)
            setCurrentButtonValue('Add Address')
            setFormDetails([])
            setLoader(false)
            setIsForm(false)
            setApiResp({
                alertMessage: '',
                alertFlag: false,
                alertText: '',
                alertBoldText: ''
            })
            setIsSummary(false)
        }
    }, [])

    useEffect(() => {
        let totalSum = 0;
        if (Object.keys(totalCartProducts).length === 0) {
            localStorage.removeItem('productInfo')
            localStorage.removeItem('addressDetails')
        } else {
            Object.keys(totalCartProducts).map(finalCartProductData => {
                totalSum += +totalCartProducts[finalCartProductData].price
                setTotalPrice(totalSum)
                setInputQuantityValue(prevInputValue => {
                    return {
                        ...prevInputValue,
                        [totalCartProducts[finalCartProductData].variantName]: 1
                    }
                })
            })
        }
    }, [totalCartProducts])

    const handleChangeInput = (variant, type) => {
        setTotalPrice(() => {
            let total = totalPrice
            if (type === 'add') {
                total += +totalCartProducts[variant].price
                setTotalPrice(total)
            } else {
                total -= +totalCartProducts[variant].price
                setTotalPrice(total)
            }
        })
        setInputQuantityValue(prevInputValue => {
            return {
                ...prevInputValue,
                [variant]: type === 'add' ? prevInputValue[variant] + 1 : (type === 'sub' && prevInputValue[variant] > 1) ? prevInputValue[variant] - 1 : 1
            }
        })
    }

    const removeHandler = variant => {
        const shallowCopy = { ...totalCartProducts }
        const shallowCopyInputQuantity = { ...inputQuantityValue }
        delete shallowCopyInputQuantity[variant]
        delete shallowCopy[variant]
        setTotalCartProducts(shallowCopy)
        setInputQuantityValue(shallowCopyInputQuantity)
        localStorage.setItem('productInfo', JSON.stringify(shallowCopy))
    }

    const handleForm = (type, formData) => {
        if (type && type === 'submit') {
            localStorage.setItem('addressDetails', JSON.stringify(formData))
            setFormDetails(formData)
            setCurrentButtonValue('Edit Address')
            setIsForm(!isForm)
        } else {
            setIsForm(!isForm)
        }
    }

    const totalQuantityCalc = () => {
        let sum = 0;
        Object.keys(inputQuantityValue).map(finalQuantityValue => {
            sum += inputQuantityValue[finalQuantityValue]
        })
        return sum
    }

    const orderConfirm = () => {
        if (radioValue === null) {
            setApiResp({
                alertMessage: 'error',
                alertFlag: true,
                alertText: 'Please select any of the payment method',
            })
            return
        }
        setIsSummary(!isSummary)
    }

    const handleSummaryForm = type => {
        if (type === 'return') {
            setIsSummary(false)
            return
        } else if (type === 'submit') {
            setLoader(true)
            if (radioValue && radioValue === 'COD' && COD) {
                localStorage.removeItem('productInfo')
                localStorage.removeItem('addressDetails')
                const orderID = uuidv4()
                sendPhoneMessage(formDetails, totalCartProducts, inputQuantityValue, totalPrice, radioValue, orderID).then(response => {
                    setLoader(false)
                    setApiResp({
                        alertFlag: true,
                        alertMessage: response,
                        alertText: 'Order has been successfully placed!',
                        alertBoldText: 'Check your mail inbox or spam!'
                    })
                }).catch(err => {
                    setLoader(false)
                    setApiResp({
                        alertFlag: true,
                        alertMessage: 'error',
                        alertText: 'Sorry for the incovinience your order has not been placed!',
                        alertBoldText: 'Please contact us through email or phone'
                    })
                })
            } else if (radioValue === 'Card/NetBanking') {
                const orderID = uuidv4()
                let name = formDetails.filter(formDetail => formDetail.formName === 'Name' && formDetail.value)[0].value
                let emailID = formDetails.filter(formDetail => formDetail.type === 'email' && formDetail.value)[0].value
                let number = formDetails.filter(formDetail => formDetail.formName === 'Mobile_Number' && formDetail.value)[0].value
                const params = {
                    amount: `${totalPrice}.00`,
                    customerId: `${name.split(' ').join('')}${(Math.random() * 10000000000000).toFixed(0)}`,
                    orderId: uuidv4(),
                    email: emailID,
                    phone: `+91${number}`
                }
                paytmIntegration(params, formDetails, totalCartProducts, inputQuantityValue, totalPrice, radioValue, orderID).then(data => {
                    setLoader(false)
                    const securePayload = {
                        action: `${process.env.GATSBY_PAYTMSECURE_API}mid=${data && data.body.mid}&orderId=${data && data.body.orderId}`,
                        params: data && data.body
                    }
                    paytmSecureServerPost(securePayload)
                    localStorage.removeItem('productInfo')
                    localStorage.removeItem('addressDetails')
                }).catch(err => {
                    setLoader(false)
                    setApiResp({
                        alertFlag: true,
                        alertMessage: 'error',
                        alertText: 'Sorry for the incovinience your order has not been placed!',
                        alertBoldText: 'Please contact us through email or phone'
                    })
                })

            }
        }
        setIsSummary(false)
    }

    const handleCloseAlert = () => {
        if (radioValue !== null) {
            homeClick('home')
            return
        }
        setApiResp({
            alertMessage: '',
            alertFlag: false,
            alertBoldText: '',
            alertText: ''
        })
    }

    const changeRadioValue = event => {
        setRadioValue(event.target.value)
    }
    return (
        <div>
            <div className="text-center">
                <p style={{
                    fontSize: '30px'
                }}>My Cart</p>
            </div>
            <div className={loader ? '' : classes.alertRoot}>
                {loader && (
                    <Backdrop className={classes.backdrop} open={true}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                )}
                {apiResp.alertFlag && (
                    <Dialog open={true} handleClose={handleCloseAlert}>
                        <Alert style={{ fontSize: '20px' }} severity={apiResp.alertMessage}>
                            <AlertTitle>{apiResp.alertMessage}</AlertTitle>
                            {apiResp.alertText}<strong> {apiResp.alertBoldText}</strong>
                        </Alert>
                        <Button style={{ fontSize: '20px' }} onClick={handleCloseAlert}>close</Button>
                    </Dialog>
                )}
            </div>
            <div className="row text-center mt-5">
                <div className="backHome col-2 col-md-2 col-xs-2">
                    <span role="presentation" onClick={() => homeClick('home')}><b>{">"}Home</b></span>
                    <br/>
                    <br/>
                </div>
            </div>

            <div className="row no-gutters justify-content-center">
                <div className="col-sm-7 p-3 card card-body">
                    {Object.keys(totalCartProducts).length > 0 ?
                        <CartProducts addressData={formDetails} inputQuantityValue={inputQuantityValue} removeHandler={removeHandler} handleChangeInput={handleChangeInput} cartItems={totalCartProducts} /> : (
                            <div className="p-3 text-center text-muted">
                                Your cart is empty
                                <p role="presentation" style={{
                                    background: 'wheat',
                                    border: '2px solid wheat',
                                    display: 'inline-block'
                                }} onClick={() => homeClick('home')}>
                                    <br />
                                    Go Back Home
                                </p>
                            </div>
                        )}
                </div>
                {Object.keys(totalCartProducts).length > 0 &&
                    (<div style={{ marginTop: '65px' }} className="col-sm-5 p-3">
                        <div className="card card-body">
                            <p className="mb-1">Total Items</p>
                            <h4 className=" mb-3 txt-right">{totalQuantityCalc()}</h4>
                            <p className="mb-1">Total Payment</p>
                            <h3 className="m-0 txt-right">₹{totalPrice}</h3>
                            <hr className="my-4" />
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Payment Mode</FormLabel>
                                <RadioGroup name="PaymentMode" value={radioValue} onChange={changeRadioValue}>
                                    <FormControlLabel value="Card/NetBanking" control={<Radio />} label="Card/NetBanking" />
                                    <FormControlLabel value="disabled" disabled={!COD} control={<Radio />} label="COD" />
                                </RadioGroup>
                            </FormControl>
                            <hr className="my-4" />
                            <div className="text-center">
                                <button type="button" className="btn btn-primary mb-2" onClick={(type, formData) => handleForm(type, formData)}>
                                    {currentButtonValue}
                                </button>
                                <button type="button" disabled={formDetails.length === 0} className="btn btn-secondary mb-2" onClick={orderConfirm}>
                                    Checkout
                                </button>
                                {isForm ? <FormDialog updatedFormData={formDetails} handleForm={(type, formData) => handleForm(type, formData)} open={isForm} /> : null}
                                {isSummary ? <SummaryForm paymentMode={radioValue} formData={formDetails} orderSummary={{
                                    totalCartProducts,
                                    inputQuantityValue,
                                    totalPrice,
                                }} isSummary={isSummary} open={isSummary} handleForm={handleSummaryForm} /> : null}
                            </div>
                        </div>
                    </div>
                    )}
            </div>
        </div >
    );
}

export default Cart;