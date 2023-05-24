// import React, { useEffect, useState } from 'react';
import { RegisterComponent } from './UI/register-component';
import './register.scss';

export const Register = () => {
    return(
        <div className="d-flex align-items-center justify-content-center centered-div pt-8"
        style={{ display: 'flex' }}>
            <RegisterComponent />
        </div>
    )
}