import React from "react";
import { useLocation } from 'react-router-dom'

function RequireAuth({ children }) {
    const { authed } = useAuth();
    const location = useLocation();

    return authed === true ? (
        children
    ) : (
        <Navigate to="/login" replace state={{ path: location.pathname }} />
    );
}