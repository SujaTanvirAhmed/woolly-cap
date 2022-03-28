import useFirebase from '../../../hooks/useFirebase';
import { Avatar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './Header.css';

export default function Header() {

    const { user } = useFirebase();

    return (
        <div className="Header">
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                </ul>
            </nav>
            {
                Object.keys(user).length > 0 ?
                    (<div>
                        <h6>{user?.displayName}</h6>
                        <h6>{user?.email}</h6>
                        <Avatar alt="User" src={user?.photoURL} />
                    </div>) :
                    (<div>
                        <h6>You're not logged-in</h6>
                    </div>)
            }
        </div>
    );
}