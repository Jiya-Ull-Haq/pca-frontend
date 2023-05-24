import { Outlet } from 'react-router-dom';
import Navbar from '../shared/navbar';
import './user.scss';

export const UserDashboard = () => {
    return(
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    )
}