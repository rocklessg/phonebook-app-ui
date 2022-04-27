import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles, Button } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/contact";
import { useToasts } from "react-toast-notifications";


const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    name: '',
    phoneNumber: '',
    email: '',
    imageUrl: ''
}

const ContactForms = ({ classes, ...props }) => {

    //toast msg.
    const { addToast } = useToasts()

    //validate()
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('phoneNumber' in fieldValues)
            temp.phoneNumber = fieldValues.phoneNumber ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/^$|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

     const handleSubmit = e => {
         e.preventDefault()
         if (validate()) {
             const onSuccess = () => {
                 resetForm()
                 addToast("Submitted successfully", { appearance: 'success' })
             }
             if (props.currentId == 0)
                 props.createContact(values, onSuccess)
             else
                 props.updateContact(props.currentId, values, onSuccess)
         }
     }

     useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.contactList.find(x => x.id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name="name"
                        variant="outlined"
                        label="Contact Name"
                        value={values.name}
                        onChange={handleInputChange}
                        {...(errors.name && { error: true, helperText: errors.name })}
                    />
                    <TextField
                        name="phoneNumber"
                        variant="outlined"
                        label="Phone Number"
                        value={values.phoneNumber}
                        onChange={handleInputChange}
                        {...(errors.phoneNumber && { error: true, helperText: errors.phoneNumber })}
                    />
                    <TextField
                        name="email"
                        variant="outlined"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                        {...(errors.email && { error: true, helperText: errors.email })}
                    />
                    <TextField
                        name="imageUrl"
                        variant="outlined"
                        label="Image Url"
                        value={values.imageUrl}
                        onChange={handleInputChange}
                    />
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}


const mapStateToProps = state => ({
    contactList: state.contact.list
})

const mapActionToProps = {
    createContact: actions.create,
    updateContact: actions.update
}
 

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ContactForms));