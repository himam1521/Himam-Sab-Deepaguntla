
import React from 'react';
import { GoogleIcon, SparklesIcon } from './icons';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 bg-opacity-50 rounded-2xl shadow-2xl backdrop-blur-lg border border-gray-700">
        <div className="text-center">
            <SparklesIcon className="w-16 h-16 mx-auto text-blue-400" />
            <h1 className="mt-4 text-4xl font-bold text-white tracking-tight">AutoDesign AI</h1>
            <p className="mt-2 text-lg text-gray-400">The Future of Automotive Innovation.</p>
        </div>
        <p className="text-center text-gray-300">
          Leverage generative AI to accelerate your design process from concept to reality. Built for engineers, by engineers.
        </p>
        <button
          onClick={onLogin}
          className="w-full flex items-center justify-center px-4 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105"
        >
          <GoogleIcon className="w-6 h-6 mr-3" />
          Sign in with Google
        </button>
        <p className="text-xs text-center text-gray-500">Free to use for all innovators. By signing in, you agree to our terms of service.</p>
      </div>
    </div>
  );
};

export default LoginPage;
