import React, { use } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';

const Login = () => {
    const {signInUser, signInWithGoogle} = use(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state || '/';     
    const handleLogin = e=>{
        e.preventDefault();
         const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email,password)
        .then(result =>{
            console.log(result);
            navigate(from)
        })
        .catch(error=>{
            console.log(error)
        })
    }

    const handlesignInWithGoogle = e => {
        e.preventDefault();
        signInWithGoogle()
            .then((result) => {
                const user = result.user;
                console.log("Google user:", user);
                navigate(`${location.state?.from?.pathname || "/"}`);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <div>
            <div className='flex justify-center items-center mt-8 mb-8'>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <p className='font-semibold text-xl text-center mt-4'>Log in with </p>
                    <form onSubmit={handleLogin} className="card-body">
                        
                        <fieldset className="fieldset">
                            {/* Google */}
                            <button type='button' onClick={handlesignInWithGoogle} className="btn bg-white text-black border-[#e5e5e5]">
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                Login with Google
                            </button>
                            <div className='flex items-center'>
                                <div className='flex-grow border-t border-gray-300 '></div>
                                <span className='mx-4 '>or</span>
                                <div className='flex-grow border-t border-gray-300 '></div>
                            </div>

                            {/* email */}
                            <label className="label">Email</label>
                            <input type="email"  name='email' className="input" placeholder="Email" required />  
                            {/* ref={emailRef} */}
                            {/* password */}
                            <label className="label">Password</label>
                            <input type="password" name='password' className="input" placeholder="Password" required />
                            <div ><a className="link link-hover">Forgot password?</a></div>



                            {/* {error && <p className='text-red-500 text-sm'> {error} </p>} */}

                            <button type='submit' className="btn btn-primary mt-4">Login</button>
                           
                            <p className='font-semibold text-center pt-5'>Don't have an account?<Link
                            className='text-primary underline' to="/register">Register</Link> </p>
                        </fieldset>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Login;