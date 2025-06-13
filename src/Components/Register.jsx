import { FaEye, FaEyeSlash, FaRegUserCircle } from 'react-icons/fa';
import React, { use, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { updateProfile } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import { auth } from '../Firebase/firebase.init';
const Register = () => {
  const { createUser, user, googleSignIn } = use(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  },[user, navigate])
  const handleRegister = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;
    const checkbox = form.checkbox.checked;
    console.log(name, photoURL, email, password, checkbox);
    if (!checkbox) {
      alert('Please accept our terms and conditions');
      return;
    }
    // password verify
    const validatePassword = password => {
      if (password.length < 6) {
        return 'Password must be at least 6 characters long.';
      }
      if (!/[a-z]/.test(password)) {
        return 'Password must contain at least one lowercase letter.';
      }
      if (!/[A-Z]/.test(password)) {
        return 'Password must contain at least one uppercase letter.';
      }
      return '';
    };
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setError(passwordValidationError);
      return;
    }
    //create user
    createUser(email, password)
      .then(result => {
        console.log(result);

        // get user profile
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoURL,
        })
          .then(() => {
            toast.success('Registration successful!');
            navigate('/');
          })
          .catch(error => {
            toast.error(error.message);
          });
      })
      .catch(error => toast.error(error.message));
  }
  
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(result => {
        console.log('Logged in with Google:', result);
        toast.success('Logged in with Google!');
        navigate('/');
      })
      .catch(error => {
        console.error('Google sign-in error:', error.message);
        toast.error(error.message);
      });
  };

  return (
    <>
    <Toaster/>
    <form
      onSubmit={handleRegister}
      className="fieldset bg-orange-100 border-red-800 rounded-box w-xs border-2 p-4 mx-auto mt-6 font-[Suse] mb-2 shadow-xl relative"
    >
      <h1>
        <FaRegUserCircle className="text-4xl text-purple-600 mx-auto mb-2" />
      </h1>
      <h1 className="text-2xl font-bold text-center text-purple-600 mb-2 font-[sora]">
        Create Account
      </h1>

      <label className="label font-bold">Name</label>
      <input
        type="text"
        name="email"
        className="input bg-white border-amber-300 text-black"
        placeholder="Enter Your Name"
        required
      />
      <label className="label font-bold">Photo</label>
      <input
        type="text"
        name="photoURL"
        className="input bg-white border-amber-300 text-black"
        placeholder="Enter Your PhotoURL"
        required
      />
      <label className="label font-bold">Email</label>
      <input
        type="email"
        name="email"
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
        className="absolute top-90 right-5 flex items-center px-2 text-blue-800"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
      <label className="label">
        <input
          type="checkbox"
          name="checkbox"
          className="checkbox bg-white text-green-400 border-gray-400"
        />
        Accept Our Terms & Conditions
      </label>
      <button className="btn border-[#e5e5e5] hover:bg-blue-500 hover:text-white text-blue-500 bg-white mt-4">
        Sign Up
      </button>
      {error && <p className="text-red-500 text-xs italic">{error}</p>}

      <div className="divider text-black divider-accent">OR</div>

      <button
        onClick={handleGoogleSignIn}
        className="btn hover:bg-blue-500 hover:text-white text-blue-500 bg-white border-[#e5e5e5]">
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
        Sign Up with Google
      </button>
      <p className="text-center mt-2 text-gray-600">
        Already SingUp? Please{' '}
        <Link
          to="/login"
          className="font-[Poppins] font-bold text-blue-600 underline"
        >
          Log In
        </Link>
      </p>
    </form>
    </>
  );
};

export default Register;
