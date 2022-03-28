// import { Navigate, Route, useLocation } from 'react-router-dom';
import { Navigate, Route } from 'react-router-dom';

export default function PrivateRoute({ element, ...rest }) {

    function PrivateElement({ element }) {
        // let location = useLocation();

        //   const { isAuthenticated, loading } = useSelector((state) => state.auth);

        //   if(loading) return <p>Loading.. </p>

        // return true ? element : <Navigate to="/login" state={{ from: location }} />;
        return true ? element : <Navigate to="/login" />;
    };


    return <Route {...rest} element={<PrivateElement element={element} />} />;
};