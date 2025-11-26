'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getHabits } from 'services/habits';

const Habits = () => {
    const [habits, setHabits] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        const storedUserName = sessionStorage.getItem("userName");
        if (!storedUserName) {
            router.push('/');
            return;
        }
        getHabits().then(fetchedHabits => {
            setHabits(fetchedHabits);
            // console.log(fetchedHabits);
        });
    }, []);

    return (
        <div className="w-full h-full relative">
            {habits.length === 0 && <p className="mt-6 text-xl text-textMain">No habits found. Start by creating a new habit!</p>}

            {habits.map((habit) => (
                <div key={habit._id} className="p-4 mb-4 border border-gray-300 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold mb-2">{habit.title}</h2>
                    <p className="text-gray-600">{habit.description}</p>
                </div>
            ))}

            <button className="absolute right-6 bg-bgButton text-white px-4 py-2 rounded hover:bg-bgButtonDark"
                onClick={() => router.push('/habits/create')}>
                Create New Habit
            </button>
        </div>
    );
}

export default Habits;