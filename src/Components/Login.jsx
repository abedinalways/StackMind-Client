import React, { use, useRef, useState } from 'react';
import { FaEye, FaEyeSlash, FaRegUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import toast from 'react-hot-toast';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';

const Login = () => {
  const { signInUser, googleSignIn } = use(AuthContext);
  const emailRef = useRef();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signInUser(email, password).then(result => {
      console.log(result);
      toast.success('Login successful!');
      navigate('/');
    }).catch(error => {
      console.error(error.message);
      toast.error('write a wrong email/password');
    })
  }
  const handleForgotPassword = () => {
    const email = emailRef.current.value;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success(
          'we have send you a password reset email. Please check your email'
        );
      })
      .catch(error => {
        toast.error(error.message);
      });
  }

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(result => {
        console.log(result);
        toast.success('Logged in with Google successfully!');
        navigate('/');
      })
      .catch(error => {
        console.error('Error signing in with Google:', error);
        toast.error(error.message);
      });
  };
  return (
    <>
      <form
        onSubmit={handleLogin}
        className="fieldset bg-orange-100 border-red-800 rounded-box w-xs border-2 p-4 mx-auto mt-6 font-[Suse] mb-2 shadow-xl relative"
      >
        <h1>
          <FaRegUserCircle className="text-4xl text-purple-600 mx-auto mb-2" />
        </h1>
        <h1 className="text-2xl font-bold text-center text-purple-600 mb-2 font-[sora]">
          Welcome back!
        </h1>

        <label className="label font-bold">Email</label>
        <input
          type="email"
          name="email"
          ref={emailRef}
          className="input bg-white border-amber-300 text-black"
          placeholder="Enter Your Email"
          required
        />

        <label className="label font-bold">Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          className="input bg-white border-amber-300 text-black"
          placeholder="Enter Your Password"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-55 right-5 flex items-center px-2 text-blue-800"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
        <p onClick={handleForgotPassword} className="text-blue-600 underline font-bold cursor-pointer">
          Forgot Password?
        </p>
        <button className="btn border-[#e5e5e5] hover:bg-blue-500 hover:text-white text-blue-500 bg-white mt-4">
          Login
        </button>
        

        <div className="divider text-black divider-accent">OR</div>

        <button
          onClick={handleGoogleSignIn}
          className="btn hover:bg-blue-500 hover:text-white text-blue-500 bg-white border-[#e5e5e5]"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
        <p className="text-center mt-2 text-gray-600">
          Don't have an account? Please{' '}
          <Link
            to="/register"
            className="font-[Poppins] font-bold text-blue-600 underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </>
  );
};

export default Login;