import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LoginHistory() {
    const [loginHistory, setLoginHistory] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/login-history')
            .then(response => {
                setLoginHistory(response.data);
            })
            .catch(error => {
                console.error('Error fetching login history:', error);
            });
    }, []);

    return (
        <div>
            <h2>Login History</h2>
            <ul>
                {loginHistory.map(entry => (
                    <li key={entry._id}>
                        <p>Login Time: {new Date(entry.loginTime).toLocaleString()}</p>
                        <p>Browser: {entry.browser}</p>
                        <p>OS: {entry.os}</p>
                        <p>Device Type: {entry.deviceType}</p>
                        <p>IP Address: {entry.ipAddress}</p>
                    </li>
                ))}
            </ul>
            {loginHistory.length === 0 && <p>No login history available.</p>}
        </div>
    );
}

export default LoginHistory;
