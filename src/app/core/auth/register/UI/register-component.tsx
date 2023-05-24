
import React, { useContext, useEffect } from 'react';
import { Form, Field, FieldMetaState } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { PrimeContext } from '../../../../App';
import { AuthService } from '../../../../services/auth.service';
import './register-component.scss';

export const RegisterComponent = () => {
    const { showToast } = useContext(PrimeContext);

    function successMessage(){
        showToast('success', 'Registered Successfully!', 'Please login to continue.');
    }
    function errorMessage(message: string){
        showToast('', message)
    }
    interface FormData {
        name: string;
        email: string;
        password: string;
        accept: string;
      }

    useEffect(() => {
    }, []); 

    const validate = (data: FormData) => {
        let errors: Partial<FormData> = {};

        if (!data.name) {
            errors.name = 'Name is required.';
        }

        if (!data.email) {
            errors.email = 'Email is required.';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = 'Invalid email address. E.g. example@email.com';
        }

        if (!data.password) {
            errors.password = 'Password is required.';
        }

        if (!data.accept) {
            errors.accept = 'You need to agree to the terms and conditions.';
        }

        return errors;
    };

    const onSubmit = (data: FormData, form: { restart: () => void; }) => {
        console.log(data);
        AuthService.register(data.name, data.email, data.password).then((response) => {
            if (response) {
                successMessage();
                window.location.href = '/login';
            }
        }).catch((error) => {
            errorMessage(error.message);
        });
        form.restart();
    };

    const isFormFieldValid = (meta: FieldMetaState<any>) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta: FieldMetaState<any>) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    
    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </React.Fragment>
    );

    return (
        <div className="form-demo">
            <div className="flex justify-content-center">
                <div className="card">
                    <p className="text-center" style={
                        { fontSize: '1.5rem' }
                    }>Register</p>
                    <Form onSubmit={onSubmit} initialValues={{ name: '', email: '', password: ''}} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid">
                            <Field name="name" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="name" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Name*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="email" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-envelope" />
                                        <InputText id="email" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Email*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            
                            <Field name="password" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Password id="password" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} header={passwordHeader} footer={passwordFooter} />
                                        <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Password*</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />

                            <Field name="accept" type="checkbox" render={({ input, meta }) => (
                            <div className="field-checkbox">
                                <Checkbox
                                inputId="accept"
                                checked={input.checked || false}
                                className={classNames({ 'p-invalid': isFormFieldValid(meta) })}
                                onBlur={input.onBlur}
                                onChange={input.onChange}
                                />
                                <label htmlFor="accept" className={classNames({ 'p-error': isFormFieldValid(meta) })}>I agree to the terms and conditions*</label>
                            </div>
                            )} />

                            <Button type="submit" label="Submit" className="mt-2" />
                            <div className="text-center mt-2">
                                <small>Already have an account? <a href="/login">Login</a></small>
                            </div>
                        </form>
                    )} />
                </div>
            </div>
        </div>
    );
}