
import { useEffect } from 'react';
import { Form, Field, FieldMetaState } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { useContext } from 'react';
import { PrimeContext } from '../../../../App';
import { AuthService } from '../../../../services/auth.service';
import './login-component.scss';

export const LoginComponent = () => {
    const { showToast } = useContext(PrimeContext);

    interface FormData {
      email: string;
      password: string;
    }
    
    const onSubmit = (data: FormData) => {
      AuthService.login(data.email, data.password)
        .then((response) => {
          console.log(response);
          if (response) {
            showToast('success', 'Login Successful!', 'Welcome back!');
            window.location.href = '/dashboard';
          }
        })
        .catch((error) => {
          showToast('error', 'Login Failed!', error.message);
        });
    };
      


    useEffect(() => {
    }, []); 
    const isFormFieldValid = (meta: FieldMetaState<any>) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta: FieldMetaState<any>) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };

    return (
        <div className="form-demo">
            <div className="flex justify-content-center">
                <div className="card">
                    <p className="text-center" style={
                    { fontSize: '1.5rem' }}>Login</p>
                    <Form onSubmit={onSubmit} initialValues={{ email: '', password: '' }} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid">

                            <Field name="email" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-envelope" />
                                        <InputText id="email" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Email</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />

                            <Field name="password" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <Password id="password" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} feedback={false}/>
                                        <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Password</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />

                            <Button type="submit" label="Submit" className="mt-2" />
                            <div className="text-center mt-2">
                                <small>Don't have an account? <a href="/register">Register</a></small>
                            </div>
                        </form>
                    )} />
                </div>
            </div>
        </div>
    );
}