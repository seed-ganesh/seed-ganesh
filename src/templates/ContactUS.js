import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { navigate } from 'gatsby';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Backdrop, Dialog, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

import contactFields from '../Constants/ContactFields'
import Layout from '../Components/Layout';
import useResize from '../Components/CustomHooks/useResize';
import { queryMessage } from '../Helpers/SendConfirmation';


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const ContactUS = props => {
    const { pathContext } = props
    const isMobile = useResize()
    const [loader, setLoader] = useState(false)
    const [apiResp, setApiResp] = useState({ alertFlag: false, alertMessage: '' })
    const [disabledSubmit, setDisabledSubmit] = useState(true)
    const [formFields, setFormFields] = useState({ ...contactFields })
    useEffect(() => {
        if (!formFields.number.error && formFields.number.firstInput && !formFields.name.error && formFields.message.firstInput &&
            formFields.name.firstInput && formFields.email.firstInput && !formFields.email.error && !formFields.message.error) {
            setDisabledSubmit(false)
        }
    }, [formFields])

    useEffect(() => {
        return () => {
            setFormFields({ ...contactFields })
            setApiResp({ alertFlag: false, alertMessage: '' })
            setLoader(false)
            setDisabledSubmit(true)
        }
    }, [])

    const classes = useStyles();

    const buyNowClick = type => {
        if (type === 'home') {
            navigate('/')
        }
    }

    const handleBlur = (event, type) => {
        if (formFields[type].value.length === 0) {
            setFormFields(prevFormValues => {
                return {
                    ...prevFormValues,
                    [type]: {
                        ...prevFormValues[type],
                        value: '',
                        error: true,
                        errorClassName: 'border-radi',
                        errorText: `${type} is a required field`,
                        firstInput: true
                    }
                }
            })
        }
    }

    const handleChange = (event, type) => {
        const emailRegex = /\S+@\S+\.\S+/
        event.persist()
        if (type === 'email') {
            if (!emailRegex.test(event.target.value)) {
                setFormFields(prevFormValues => {
                    return {
                        ...prevFormValues,
                        [type]: {
                            ...prevFormValues[type],
                            value: event.target.value,
                            error: true,
                            errorClassName: 'border-radi',
                            errorText: 'InValid Email',
                            firstInput: true
                        }
                    }
                })
            } else {
                setFormFields(prevFormValues => {
                    return {
                        ...prevFormValues,
                        [type]: {
                            ...prevFormValues[type],
                            value: event.target.value,
                            error: false,
                            errorClassName: '',
                            errorText: '',
                            firstInput: true
                        }
                    }
                })
            }
        } else if (type === 'number') {
            setFormFields(prevFormValues => {
                return {
                    ...prevFormValues,
                    [type]: {
                        ...prevFormValues[type],
                        value: event.target.value,
                        error: event.target.value.length === 10 ? false : true,
                        errorClassName: event.target.value.length === 10 ? '' : 'border-radi',
                        errorText: event.target.value.length === 0 ? `Phone ${type} is a required field` : event.target.value.length !== 10 ? `Phone ${type} should contain 10 digits` : '',
                        firstInput: true
                    }
                }
            })
        } else {
            setFormFields(prevFormValues => {
                return {
                    ...prevFormValues,
                    [type]: {
                        ...prevFormValues[type],
                        value: event.target.value,
                        error: event.target.value.length === 0 ? true : false,
                        errorClassName: event.target.value.length === 0 ? 'border-radi' : '',
                        errorText: event.target.value.length === 0 ? `${type} is a required field` : '',
                        firstInput: true
                    }
                }
            })
        }
    }

    const onSubmit = () => {
        setLoader(true)
        queryMessage(formFields.name.value, formFields.email.value, formFields.number.value, formFields.message.value).then(response => {
            setApiResp({
                alertFlag: true,
                alertMessage: response
            })
            setLoader(false)

        }).catch(error => {
            setApiResp({
                alertFlag: true,
                alertMessage: 'error'
            })
            setLoader(false)
        })
    }

    const handleCloseAlert = () => {
        setApiResp({
            alertMessage: '',
            alertFlag: false
        })
        buyNowClick('home')
    }
    return (
        <Layout buyNowClick={buyNowClick} isMobile={isMobile} isContactUs {...pathContext} >
            {loader && (
                <Backdrop className={classes.backdrop} open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}
            {apiResp.alertFlag && (
                <Dialog open={true} bor handleClose={handleCloseAlert}>
                    <Alert style={{ fontSize: '20px' }} severity={apiResp.alertMessage}>
                        {apiResp.alertMessage === 'success' ? (
                            <>
                                <AlertTitle>{apiResp.alertMessage}</AlertTitle>
                                Your Query has been Successfully submitted — <strong>Someone from our team will contact you!</strong>
                            </>
                        ) : (
                                <>
                                    <AlertTitle>{apiResp.alertMessage}</AlertTitle>
                                    Your Query has not been submitted — <strong>Internal Error!</strong>
                                </>
                            )}
                    </Alert>
                    <Button style={{ fontSize: '20px' }} onClick={handleCloseAlert}>close</Button>
                </Dialog>
            )}
            <Helmet>
                <link href="https://fonts.googleapis.com/css?family=Actor" rel="stylesheet" data-react-helmet="true" />
                <link href="//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
                <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min.js"></script>
                <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
            </Helmet>
            <div style={{
                paddingTop: '100px',
                textAlign: 'center',
                overflow: 'hidden',
                height: 'auto'
            }} >
                <div className="row">
                    <div className="col-md-4" />
                    <div className="col-lg-7 col-md-7 col-md-offset-3 col-lg-offset-3">
                        <div style={{
                            height: 'auto',
                            background: 'transparent',
                            border: 'none'
                        }} className="well well-sm">
                            <form className="form-horizontal" action="" method="post">
                                <fieldset>
                                    <legend className="col-md-9 col-lg-9 col-lg-offset-1 col-md-offset-1 text-center">Contact us</legend>
                                    {Object.keys(formFields).map(formData => (
                                        <div className="form-group">
                                            <div className="col-lg-9 col-md-9 col-md-offset-1 col-lg-offset-1 text-center">
                                                {!formFields[formData].textField ? (
                                                    <>
                                                        <input style={{
                                                            height: "50px",
                                                            backgroundColor: formFields[formData].error ? '#fce4e4' : '',
                                                            border: formFields[formData].error ? '1px solid #cc0033' : '',
                                                            outline: formFields[formData].error ? 'none' : ''
                                                        }} onBlur={(event) => handleBlur(event, formData)} onChange={(event) => handleChange(event, formData)} {...formFields[formData]} />
                                                    </>
                                                ) : (
                                                        <>
                                                            <textarea style={{
                                                                backgroundColor: formFields[formData].error ? '#fce4e4' : '',
                                                                border: formFields[formData].error ? '1px solid #cc0033' : '',
                                                                outline: formFields[formData].error ? 'none' : ''
                                                            }} onBlur={(event) => handleBlur(event, formData)} onChange={(event) => handleChange(event, formData)} {...formFields[formData]}></textarea>
                                                        </>
                                                    )}
                                                {formFields[formData].error && <p style={{ float: 'left', padding: '10px', color: 'red' }}>{formFields[formData].errorText}</p>}
                                            </div>
                                        </div>
                                    ))}
                                    <div className="form-group">
                                        <div className="col-md-9 col-md-offset-1 text-center">
                                            <button disabled={disabledSubmit} type="button" onClick={onSubmit} className="btn btn-primary btn-lg">Submit</button>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default ContactUS