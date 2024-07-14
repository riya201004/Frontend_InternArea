import React, { useState, useEffect } from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import OTPInput from 'react-otp-input';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const MobileOTP = ({onOTPVerified}) => {
    const [phoneNo, setPhoneNo] = useState('');
    const [OTP, setOTP] = useState('');
    const [otpSent, setOTPSent] = useState(false);
    // const [otpVerified, setOTPVerified] = useState(false);

    const auth = getAuth();

    // Initialize reCAPTCHA
    useEffect (() => {
        const initializeRecaptcha = () => {
            if (!window.recaptchaVerifier) {
                window.recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha-container', {
                    'size': 'invisible',
                    'callback': (response) => {
                        // reCAPTCHA solved - you can proceed with phone auth
                        console.log("reCAPTCHA solved");
                        alert("CAPTCHA verified. You can now proceed with the OTP verification.")
                        // sendPhoneOTP(phoneNo);// Call sendPhoneOTP after reCAPTCHA verification
                    },
                    'expired-callback': () => {
                        // Response expired. Ask user to solve reCAPTCHA again.
                        console.log("reCAPTCHA expired. Please solve it again.");
                        alert("CAPTCHA expired. Please solve it again.");
                    },
                });

                window.recaptchaVerifier.render().then(function(widgetId) {
                    window.recaptchaWidgetId = widgetId;
                    console.log("reCAPTCHA rendered with widget ID:", widgetId);
                }).catch((error) => {
                    console.error('Error rendering reCAPTCHA:', error);
                });
            }
        };
        // Ensure the recaptcha-container element exists
        const recaptchaContainer = document.getElementById('recaptcha-container');
        if (recaptchaContainer) {
            initializeRecaptcha();
        } else {
            console.error('reCAPTCHA container not found');
        }
    }, [auth]);
  
    // Send phone OTP
    const sendPhoneOTP = (phoneNo) => {
        const appVerifier = window.recaptchaVerifier;

        // Ensure phone number starts with '+'
        if (!phoneNo.startsWith('+')) {
            phoneNo = `+${phoneNo}`;
        }

        if (!/^\+[1-9]\d{1,14}$/.test(phoneNo)) {
            alert('Invalid phone number format.');
            return;
        }

        console.log("Phone number sent for OTP:", phoneNo); // Log the phone number to console

        signInWithPhoneNumber(auth, phoneNo, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            // setLoading(false);
            setOTPSent(true);
            alert('OTP sent to your phone.');
        })
        .catch((error) => {
            console.error('Error sending OTP:', error);
            alert('Error sending OTP: ' + error.message);
        });
    };
  
    // Verify phone OTP
    const verifyPhoneOTP = () => {
        const code = OTP;
        window.confirmationResult.confirm(code).then((result) => {
            // const user = result.user;
            // setOTPVerified(true); // Update state to reflect OTP verification
            onOTPVerified(true); // Notify parent component (i.e., navbar) of successful OTP verification
            console.log('Phone number verified successfully.');
            alert('Phone number verified successfully.');
        }).catch((error) => {
            console.error('Error verifying OTP:', error);
            alert('Error verifying OTP: ' + error.message);
        });
    };

    // Log phone number changes
    console.log('Phone number:', phoneNo);

    // Log OTP changes
    console.log('Entered OTP:', OTP);
    
    return(
        <div>

            <div id="recaptcha-container"></div> {/* Ensure this element is present */}

            <PhoneInput 
                country={'in'}
                value={phoneNo}
                onChange={(phoneNo) => {
                    setPhoneNo(phoneNo);
                    console.log("Phone number input changed to:", phoneNo); // Log the phone number change
                }}
                inputProps={{
                    name: 'phone',
                    required: true,
                    autoFocus: true
                }}
            />
            <button id="sendOTPbtn" variant="contained" onClick={() => sendPhoneOTP(phoneNo)}>Send OTP</button>

            {otpSent && (
                <div>
                    <OTPInput
                        value={OTP} 
                        onChange={setOTP}
                        numInputs={6}
                        renderInput={(props) => <input {...props} />}
                        separator={<span>-</span>}
                    />
                    <button id="verifyOTPbtn" variant="contained" color="success" onClick={verifyPhoneOTP}>Verify OTP</button>
                </div>
            )}

        </div>
    );
};

export default MobileOTP;
