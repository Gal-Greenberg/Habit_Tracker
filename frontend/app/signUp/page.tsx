'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { register } from '../../services/auth';

const signUp = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSignUp = async () => {
        if (!userName || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }
        
        try {
            await register(userName, email, password);
            router.push('/');
            router.refresh();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Sign up failed. Please try again.";
            alert(errorMessage);
        }
    };

    return (
        <div className="text-center">
            <p className="text-2xl py-4">Create your account</p>
            <p className="text-lg py-4">Join Habit Tracker and start building a routine that propels you</p>
            <input
                type="text"
                placeholder="User Name"
                className="border border-gray-300 rounded px-3 py-4 mb-6"
                onChange={(e) => (setUserName(e.target.value))}
            />
            <br />
            <input
                type="text"
                placeholder="Email"
                className="border border-gray-300 rounded px-3 py-3 mb-6"
                onChange={(e) => (setEmail(e.target.value))}
            />
            <br />
            <input
                type="password"
                placeholder="Password"
                className="border border-gray-300 rounded px-3 py-3 mb-2"
                onChange={(e) => (setPassword(e.target.value))}
            />
            <br />
            <p className="py-3">Already have an account?
                <Link href="/signIn" className="text-purple-600 hover:underline ml-2">
                    Login
                </Link>
            </p>
            <button className="bg-purple-600 text-white px-10 py-2 rounded hover:bg-purple-700" 
                onClick={handleSignUp}>
                Sign Up
            </button>
        </div>
    );
}

export default signUp;