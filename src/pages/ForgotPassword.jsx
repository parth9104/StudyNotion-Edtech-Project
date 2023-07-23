import React, { useState }  from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {Link} from "react-router-dom"
import { getPasswordResetToken } from "../services/operations/authAPI";
const ForgotPassword =()=>{
    const[emailSent,setEmailsent] =useState(false);
    const[email, setEmail]=useState("");
    const{loading} = useSelector((state)=>state.auth);
    const dispatch = dispatch();

    const handleOnSubmit=(e)=>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailsent));
    }
    return(
        <div className='text-whit flex justify-center items-center '>
            {
                loading?(
                    <div>loading.....</div>
                ):(
                    <div>
                        <h1>{
                            !emailSent? "Reset your password":"check your email"
                        }
                        </h1>
                        <p>{
!emailSent
?"Have no fear. we'll email you instructons to reset passwords. If you don'nt have access to your email we can try account recovery"
:`we have sent email to the ${email}`
                        }</p>
                        <form>
                            {
                                !emailSent&&(
                                    <label>
                                        <p>Email Address*</p>
                                        <input
                                        required
                                        type='email'
                                        name='email'
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                        placeholder="enter your email address"
                                        />
                                    </label>
                                )
                            }
                            <button onSubmit={handleOnSubmit}>
                                {
                                    !emailSent ? "Reset Password":"Reset Email"
                                }
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
export default ForgotPassword