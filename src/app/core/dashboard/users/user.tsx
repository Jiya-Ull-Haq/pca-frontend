import { Outlet } from 'react-router-dom';
import Navbar from '../shared/navbar';
import './user.scss';
import { Toast } from 'primereact/toast';
import { createContext, useRef } from 'react';
export const PrimeContext = createContext<any>(null);
export const UserDashboard = () => {
    const toast = useRef<Toast>(null);
    const showToast = (severity: "success" | "info" | "warn" | "error" | undefined, summary: string, detail: string) => {
    toast.current?.show({ severity, summary, detail });
    };
    return(
        <div>
            <Navbar></Navbar>
            <Toast ref={toast} />
            <PrimeContext.Provider value={{ showToast}}>
                <Outlet></Outlet>
            </PrimeContext.Provider>
        </div>
    )
}