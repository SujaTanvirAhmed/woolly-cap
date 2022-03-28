import { Navigate, useLocation } from 'react-router-dom';
import useLocal from '../hooks/useLocal';
import ProfileBody from './ProfileBody';

export default function Profile() {

    const { isLoggedIn } = useLocal();
    const location = useLocation();
    console.log("profile location:", location);

    return isLoggedIn() ? <ProfileBody /> : <Navigate to="/login" state={{ from: location.pathname }} />;
}