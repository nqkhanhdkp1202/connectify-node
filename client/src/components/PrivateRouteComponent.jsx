import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export { PrivateRouteComponent };

function PrivateRouteComponent(props) {
    const token = localStorage.getItem("token")
    console.log(token);
    const { children } = props
    return (
        <>
            {token !== null ? children : <Navigate to={{ pathname: '/login'}} />}
        </>
    );
}