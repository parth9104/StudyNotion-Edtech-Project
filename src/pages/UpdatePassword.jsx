import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";
const UpdatePassword = () => {
    const dipatch = useDispatch();
    const location = useLocation();
    const [formdata, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmPassword] = useState(false);
    const { loading } = useSelector((state) => state.auth);
    const { password, confirmPassword } = formdata;

    const handleOnChange = (e) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value,
            }
        ))
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dipatch(resetPassword(password, confirmPassword, token));
    }

    return (
        <div>
            {
                loading ? (
                    <div>
                        Loading...
                    </div>
                ) : (
                    <div>
                        <h1> Choose new Password</h1>
                        <p>Almost done. Enter your new password and you are all set</p>
                        <form onSubmit={handleOnSubmit}>
                            <label>
                                <p>new password*</p>
                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    name='password'
                                    value={password}
                                    onChange={handleOnChange}
                                    placeholder="password"
                                    className='w-full p-6 bg-richblack-600 text-richblack-5'

                                />
                                <span
                                    onClick={() => setShowPassword((prev) => !prev)}>
                                    {
                                        showPassword ? <AiFillEyeInvisible fontSize={24} /> : <AiFillEye fontSize={24} />
                                    }
                                </span>
                            </label>
                            <label>
                                <p>Confirm new password*</p>
                                <input
                                    required
                                    type={showConfirmPassword ? "text" : "password"}
                                    name='confirmPassword'
                                    value={confirmPassword}
                                    onChange={handleOnChange}
                                    placeholder="Confirm Password"
                                    className='w-full p-6 bg-richblack-600 text-richblack-5'


                                />
                                <span
                                    onClick={() => showConfirmPassword((prev) => !prev)}>
                                    {
                                        confirmPassword ? <AiFillEyeInvisible fontSize={24} /> : <AiFillEye fontSize={24} />
                                    }
                                </span>
                            </label>
                            <button type='submit'>
                                Reset Password
                            </button>
                        </form>
                        <div>
                            <Link to="/Login">
                                <p>Back to login</p>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
export default UpdatePassword