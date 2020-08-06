import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import formFields from './FormConstant'

export default function FormDialog(props) {
    const { open, handleForm, updatedFormData } = props;
    const [formFinalData, setFormFinalData] = useState([])

    const handleValidateForm = () => {
        for (let i = 0; i < formFinalData.length; i++) {
            if (!formFinalData[i].error && i === formFinalData.length - 1) {
                handleForm('submit', formFinalData)
            } else if (formFinalData[i].error) {
                break;
            }
        }
    }

    useEffect(() => {
        if (updatedFormData.length === 0) {
            formFields.map(fieldData => {
                setFormFinalData(fieldValue => {
                    return [
                        ...fieldValue,
                        {
                            ...{
                                ...fieldData,
                                value: '',
                                error: fieldData.mandatory,
                                validationError: false
                            }
                        }
                    ]
                })
            })
        } else {
            setFormFinalData(updatedFormData)
        }
    }, [])
    const handleChange = (event, fieldData, index) => {
        const shallowCopy = [...formFinalData]
        switch (fieldData && fieldData.formName) {
            case 'Mobile_Number': {
                if (event.target && event.target.value.length < fieldData.length) {
                    event.persist()
                    shallowCopy[index].value = event.target.value
                    shallowCopy[index].error = true
                    shallowCopy[index].validationError = false
                    setFormFinalData(shallowCopy)
                } else {
                    event.persist()
                    shallowCopy[index].value = event.target.value
                    shallowCopy[index].error = false
                    shallowCopy[index].validationError = false
                    setFormFinalData(shallowCopy)
                }
            }
                break;
            case 'Email': {
                const emailRegex = /\S+@\S+\.\S+/
                if (event.target && !emailRegex.test(event.target.value)) {
                    event.persist()
                    shallowCopy[index].value = event.target.value
                    shallowCopy[index].error = true
                    shallowCopy[index].validationError = true
                    setFormFinalData(shallowCopy)
                } else {
                    event.persist()
                    shallowCopy[index].value = event.target.value
                    shallowCopy[index].error = false
                    shallowCopy[index].validationError = false
                    setFormFinalData(shallowCopy)
                }
                break;
            }
            case 'Pincode': {
                if (event.target && event.target.value.length < fieldData.length) {
                    event.persist()
                    shallowCopy[index].value = event.target.value
                    shallowCopy[index].error = true
                    shallowCopy[index].validationError = false
                    setFormFinalData(shallowCopy)
                } else {
                    event.persist()
                    shallowCopy[index].value = event.target.value
                    shallowCopy[index].error = false
                    shallowCopy[index].validationError = false
                    setFormFinalData(shallowCopy)
                }
            }
                break;

            default: {
                event.persist()
                shallowCopy[index].value = event.target.value
                shallowCopy[index].error = event.target.value.length === 0 ? true : false
                shallowCopy[index].validationError = false
                setFormFinalData(shallowCopy)
            }
        }
    }
    return (
        <div>
            <Dialog open={open} onClose={handleForm} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <DialogContentText>
                        Please enter all the mandatory fields
                    </DialogContentText>
                    {formFinalData.map((formField, index) => (
                        <TextField
                            onChange={(event) => handleChange(event, formField, index)}
                            onInput={formField.type === 'number' ? (e) => {
                                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, formField.length)
                            } : () => { }}
                            required={formField.mandatory}
                            error={formField.mandatory && formFinalData[index] && formFinalData[index].error}
                            helperText={(formFinalData[index] && formFinalData[index].validationError) ? (formField.validationText) : null}
                            margin="dense"
                            value={formField.value}
                            id={formField.formName}
                            label={formField.label}
                            type={formField.type}
                            fullWidth
                            multiline={formField.multiline}
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleForm} color="primary">Cancel</Button>
                    <Button onClick={handleValidateForm} color="primary">Add</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}
