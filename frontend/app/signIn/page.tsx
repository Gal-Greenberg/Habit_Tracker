'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { signIn } from '../services/auth';

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSignIn = async () => {
        if (!email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            await signIn(email, password);
            router.push('/habits');
            router.refresh();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Sign in failed. Please try again.";
            alert(errorMessage);
        }
    }

    return (
        <div className="text-center">
            <p className="text-textMain text-2xl">Sign in to your account</p>
            <p className="text-textSecondary text-lg py-4">Welcome back please enter your detailes</p>

            <input
                type="text"
                placeholder="Email"
                className="border border-gray-300 rounded px-3 py-4 mb-6"
                onChange={(e) => (setEmail(e.target.value))}
            />
            <br />
            <input
                type="password"
                placeholder="Password"
                className="border border-gray-300 rounded px-3 py-4 mb-6"
                onChange={(e) => (setPassword(e.target.value))}
            />
            <br />
            <p className="py-3">New to Habit Tracker?
                <Link href="/signUp" className="text-bgButton hover:underline ml-2">
                    Create an account
                </Link>
            </p>
            <br />
            <button className="bg-bgButton text-white px-10 py-2 rounded hover:bg-bgButtonDark"
                onClick={handleSignIn}>
                Sign In
            </button>
        </div>
    );
}

export default SignIn;