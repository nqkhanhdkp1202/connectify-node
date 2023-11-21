import { Navigate } from 'react-router-dom';

export { PrivateRouteComponent };

function PrivateRouteComponent(props) {
    const token = localStorage.getItem("token")
    const auth = token ? true : false;
    const { children } = props
    return (
        <>
            {auth ? children : <Navigate to={{ pathname: '/login', state: { from: props.location } }} />}
        </>
    );
}