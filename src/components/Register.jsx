// src/components/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BASEURL}/auth/register`, { email, password });
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Error during registration.');
    }
  };

  const handleGoogleSignIn = async (token) => {
    try {

      const response = await axios.post(`${process.env.REACT_APP_BASEURL}/auth/google`, {
        token
      });
      if (response.data.tokenId) {
        // Store the token in localStorage and redirect to the home page
        localStorage.setItem('token', response.data.tokenId);
        localStorage.setItem('access_token', token);
        navigate('/');
      }
    } catch (error) {
      console.error('Google Sign-In Error', error);
      alert('Error during Google Sign-In. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Register/
          <a className="cursor-pointer" onClick={() => navigate('/login')}>
            <h2>Login</h2>
          </a>
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
          />
          <button type="submit" className="w-full p-3 bg-indigo-600 text-white rounded-lg">
            Register
          </button>
        </form>
        <div className="w-full p-3 mt-4">
          <GoogleLogin
            onSuccess={(response) => handleGoogleSignIn(response.credential)}
            onError={() => alert('Google Sign-In failed')}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
