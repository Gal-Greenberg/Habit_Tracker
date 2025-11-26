'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getGoals } from 'services/goals';

const Goals = () => {
    const [goals, setGoals] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        const storedUserName = sessionStorage.getItem("userName");
        if (!storedUserName) {
            router.push('/');
            return;
        }
        getGoals().then(fetchedGoals => {
            setGoals(fetchedGoals);
            // console.log(fetchedGoals);
        });
    }, []);

    return (
       <div className="w-full h-full relative">
            {goals.length === 0 && <p className="mt-6 text-xl text-textMain">No golas found. Start by creating a new goal!</p>}

            {goals.map((goal) => (
                <div key={goal._id} className="p-4 mb-4 border border-gray-300 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold mb-2">{goal.title}</h2>
                    <p className="text-gray-600">{goal.description}</p>
                </div>
            ))}

            <button className="absolute right-6 mb-20 bg-bgButton text-white px-4 py-2 rounded hover:bg-bgButtonDark"
                onClick={() => router.push('/goals/create')}>
                Create New Goal
            </button>
        </div>
    );
}

export default Goals;