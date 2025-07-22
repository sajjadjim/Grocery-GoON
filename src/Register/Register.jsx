import React, { use, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';

const Register = () => {
    const { createUser, updateUser, setUser } = use(AuthContext);
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();


    const handleRegister = (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form)

        const { email, password } = Object.fromEntries(formData.entries());
        const name = formData.get("name");
        const photo = formData.get("photo");

        setSuccess(false);

        if (!/[a-z]/.test(password)) {
            setErrorMessage('Password must include at least one lowercase letter.');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setErrorMessage('Password must include at least one uppercase letter.'
            );
            return;
        }
        else if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long.');
            return;
        } else {
            setErrorMessage('');
        }


        createUser(email, password)
            .then(result => {
                const user = result.user;
                return updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        const updatedUser = {
                            ...user,
                            displayName: name,
                            photoURL: photo
                        };
                        setUser(updatedUser)

                        const userProfile = {
                            name,
                            email,
                            photo
                        };
                        console.log("User profile updated:", userProfile);

                        return axios.post(`${import.meta.env.VITE_API_URL}/user`, userProfile);

                    })
            })
            .then(res => res.data)
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your Account has been created.",
                        showConfirmButton: false,
                        timer: 1500
                    });


                    setSuccess(true);
                    navigate('/');
                }
            })
            .catch((error) => {

                const errorMessage = error.message;
                // alert(errorMessage);
                setErrorMessage(errorMessage);
            });
    }
    return (
        <div className='flex justify-center items-center '>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <p className='font-semibold text-xl text-center mt-4'>Register your Account </p>
                <form onSubmit={handleRegister} className="card-body">
                    <fieldset className="fieldset">
                        {/* name */}
                        <label className="label">Name</label>
                        <input
                            name='name'
                            type="text" className="input" placeholder="Your Name" required />

                        {/* email */}
                        <label className="label">Email</label>
                        <input type="email" name='email' className="input" placeholder="Email" required />
                        {/* Photo URL */}
                        <label className="label">Photo URL</label>
                        <input name='photo' type="text" className="input" placeholder="Photo URL" required />
                        {/* password */}
                        <label className="label">Password</label>
                        <input type="password"
                            name='password'
                            className="input"
                            placeholder="Password"
                            required
                        />

                        <button type='submit' className="btn btn-primary mt-4">Register</button>
                        <p className='font-semibold text-center pt-5'>Already have an account?<Link className='text-primary underline' to="/login">Login</Link> </p>
                    </fieldset>
                </form>
                {
                    errorMessage && <p className='text-red-600'>{errorMessage}</p>
                }
                {
                    success && <p className='text-green-500'>User has created successfully</p>
                }
            </div>
        </div>
    );
};

export default Register;