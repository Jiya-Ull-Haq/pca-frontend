// import React, { useEffect, useState } from 'react';
import { LoginComponent } from './UI/login-component';
import './login.scss';

export const Login = () => {
    return(
        <div className="d-flex align-items-center justify-content-center centered-div pt-8"
        style={{ display: 'flex' }}>
            <LoginComponent 
             />
        </div>
    )
}