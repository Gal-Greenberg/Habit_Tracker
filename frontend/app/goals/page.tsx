'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGoals } from "@/context/GoalsContext";

const Goals = () => {
    const { goals } = useGoals();
    const router = useRouter();
    
    useEffect(() => {
        const storedUserName = sessionStorage.getItem("userName");
        if (!storedUserName) {
            router.push('/');
            return;
        }
    }, []);

    return (
       <div className="w-full h-full">
            {goals.length === 0 && <p className="mt-6 text-xl text-textMain">No golas found. Start by creating a new goal!</p>}

            {goals.map((goal) => (
                <div key={goal._id} className="p-4 mb-4 border border-gray-300 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold mb-2">{goal.title}</h2>
                    <p className="text-gray-600">{goal.description}</p>
                    <button className="mt-4 bg-bgButton text-white px-4 py-2 rounded hover:bg-bgButtonDark"
                        onClick={() => router.push(`/goals/create/${goal._id}`)}>
                        View Details
                    </button>
                </div>
            ))}

            <div className="flex justify-end">
                <button className="bg-bgButton text-white px-4 py-2 rounded hover:bg-bgButtonDark"
                    onClick={() => router.push('/goals/create/new')}>
                    Create New Goal
                </button>
            </div>
        </div>
    );
}

export default Goals;