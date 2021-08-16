import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Dashboard(props) {
    const auth = useSelector((state) => state.app.auth);
    console.log(auth);
    return (
        <div>
            <h2>Dashboard</h2>
            <p>hello {auth.user.name}</p>
        </div>
    );
}

export default Dashboard;