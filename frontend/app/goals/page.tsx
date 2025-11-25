'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Goals = () => {
    const [goals, setGoals] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const storedUserName = sessionStorage.getItem("userName");
        if (!storedUserName) {
            router.push('/');
            return;
        }
    }, []);

    return (
       <div className="w-full h-full relative">
            <div className="mt-6 text-xl text-textMain">
                {goals.length === 0 && <p>No golas found. Start by creating a new goal!</p>}
            </div>

            <button className="absolute right-6 bottom-10 bg-bgButton text-white px-4 py-2 rounded hover:bg-bgButtonDark"
                onClick={() => router.push('/goals/create')}>
                Create New Goal
            </button>
        </div>
    );
}

export default Goals;