import React, { useState } from "react";
import { userSelector } from "react-dom"

const UpdatePassword = () => {
    const [formdata, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmPassword] = useState(false);
    const { loading } = userSelector((state) => state.auth);
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
        dipatch(resertPassword(password, confirmPassword, token));
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

                                />
                            </label>
                        </form>
                    </div>
                )
            }
        </div>
    )
}