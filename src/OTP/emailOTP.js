// EmailOTP.js
import React, { useState, useEffect } from "react";
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';

const EmailOTP = ({ onOTPVerified }) => {
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const auth = getAuth();

    useEffect(() => {
        if (isSignInWithEmailLink(auth, window.location.href)) {
            let email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                email = window.prompt('Please provide your email for confirmation');
            }
            signInWithEmailLink(auth, email, window.location.href)
                .then((result) => {
                    window.localStorage.removeItem('emailForSignIn');
                    onOTPVerified(true); // Notify parent component of successful email OTP verification
                    console.log('Email verified successfully.');
                    alert('Email verified successfully.');
                })
                .catch((error) => {
                    console.error('Error verifying email OTP:', error);
                    alert('Error verifying email OTP: ' + error.message);
                });
        }
    }, [auth, onOTPVerified]);

    const sendEmailOTP = (email) => {
        const actionCodeSettings = {
            url: 'http://localhost:3000/',
            handleCodeInApp: true,
        };

        console.log('Action Code URL:', actionCodeSettings.url); // Log the URL being sent

        sendSignInLinkToEmail(auth, email, actionCodeSettings)
            .then(() => {
                window.localStorage.setItem('emailForSignIn', email);
                setEmailSent(true);
                alert('Email with OTP link sent to ' + email);
            })
            .catch((error) => {
                console.error('Error sending email OTP:', error);
                alert('Error sending email OTP: ' + error.message);
            });
    };

    return (
        <div>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
            />
            <button onClick={() => sendEmailOTP(email)}>Send OTP Link</button>

        </div>
    );
};

export default EmailOTP;
