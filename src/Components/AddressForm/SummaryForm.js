import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';


const SummaryForm = props => {
    const { open, handleForm, formData, paymentMode, orderSummary } = props

    return (
        <div>
            <Dialog style={{
                marginTop: '50px'
            }} open={open} onClose={() => handleForm('return')} aria-labelledby="form-dialog-title">
                <p style={{
                    textAlign: 'center',
                    marginTop: '20px',
                    fontSize: '20px'
                }}>Order Summary</p>
                <hr className="my-1" />
                <DialogContent>
                    <div className="container">
                        <hr style={{
                            borderBottom: '3px solid black'
                        }} />
                        <div className="row" style={{
                            fontSize: '21px',
                            textAlign: 'center',
                            fontFamily: 'fantasy'
                        }}>
                            <div className="col-6 col-md-6">
                                <p>Size</p>
                            </div>
                            <div className="col-6 col-md-6">
                                <p>Quantity</p>
                            </div>
                        </div>
                        {Object.keys(orderSummary.inputQuantityValue).map(orderProp => (
                            <div className="row" style={{
                                textAlign: 'center'
                            }}>
                                <div className="col-6 col-md-6">
                                    <p>{orderProp} :</p>
                                </div>
                                <div className="col-6 col-md-6">
                                    <p><b>{orderSummary.inputQuantityValue[orderProp]}</b></p>
                                </div>
                            </div>
                        ))}
                        <hr style={{
                            borderBottom: '3px solid black'
                        }} />
                        <div className="row" style={{
                            fontSize: '21px',
                            textAlign: 'center',
                            fontFamily: 'fantasy'
                        }}>
                            <div className="col-6 col-md-6">
                                <p>Total Price</p>
                            </div>
                            <div className="col-6 col-md-6">
                                <p>₹ {orderSummary.totalPrice}</p>
                            </div>
                        </div>
                        <hr style={{
                            borderBottom: '3px solid black'
                        }} />
                        <div className="row" style={{
                            fontSize: '21px',
                            textAlign: 'center',
                            fontFamily: 'fantasy'
                        }}>
                            <div className="col-6 col-md-6">
                                <p>Payment Mode</p>
                            </div>
                            <div className="col-6 col-md-6">
                                <p>{paymentMode}</p>
                            </div>
                        </div>
                        <hr style={{
                            borderBottom: '3px solid black'
                        }} />

                    </div>
                    {formData.length > 0 && (
                        <div className="container">
                            <h4 style={{
                                textDecoration: 'underline',
                                textAlign: 'center'
                            }}>Address Details:</h4>
                            <hr />
                            <address class="vcard">
                                {formData.map((addressFields, index) => addressFields.value.length > 0 && (
                                    <span className="row">
                                        <span style={{
                                            wordBreak: 'break-word',
                                            paddingTop: '8px'
                                        }} className="adr col-12">
                                            <span className="street-address">{addressFields.value}
                                                {index === formData.length - 1 ? <>.</> : <>,</>}
                                            </span>
                                        </span>
                                    </span>
                                ))}
                            </address>
                        </div>
                    )
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleForm('return')} color="primary">Cancel</Button>
                    <Button onClick={() => handleForm('submit')} color="primary">Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}


export default SummaryForm