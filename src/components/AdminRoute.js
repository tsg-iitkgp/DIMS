import { Redirect, Route } from 'react-router-dom';

function AdminRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) =>
                (localStorage.getItem("authToken") && (localStorage.getItem("role") === 'admin')) ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    )
}

export default AdminRoute;
