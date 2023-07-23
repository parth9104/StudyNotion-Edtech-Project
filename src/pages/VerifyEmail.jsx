import React, { useEffect, userState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { Navigate, Navigation } from "react-router-dom";

const VerifyEmail = () => {
    const [otp, setOtp] = userState("");
    const dispatch = useDispatch();
    const usenavigate = useNavigate();
    const { signupData, loading } = useSelector((state) => state.auth);
    useEffect(() => {
        if (!signupData) {
            Navigate("/signup");
        }
    }, [])
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            navigate

        } = signupData;
        dispatch(signUp(accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            navigate))

    }
    return (
        <div className="text-white flex items-center justify-center mt-[150px]">
            {
                loading ?
                    (<div>
                        Loading...
                    </div>) : (
                        <div>
                            <h1>Verify Email</h1>
                            <p>A verification code has been sent to you. enter the code below</p>
                            <form onSubmit={handleOnSubmit}>
                                <OTPInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderSeparator={<span>-</span>}
                                    renderInput={(props) => <input {...props} className='bg-richblack-800'/>}
                                />
                                <button type='submit'>
                                    Verify Email
                                </button>
                            </form>
                            <div>
                                <div>
                                    <Link to="/login">
                                        <p>Back to login</p>
                                    </Link>
                                </div>
                                <button onClick={() => dispatch(sendOtp(signupData.email))}>
                                    Resend it
                                </button>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}
export default VerifyEmail;