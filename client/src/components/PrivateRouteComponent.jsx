import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export { PrivateRouteComponent };

function PrivateRouteComponent({children}) {
    const token = localStorage.getItem("token");

    return (
        <>
            {token ? children : <Navigate to='/login' />}
        </>
    );
}