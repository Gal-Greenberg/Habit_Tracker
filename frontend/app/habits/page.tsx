'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HabitCard from '@/components/HabitCard';
import { useHabits } from '@/context/HabitsContext';

const Habits = () => {
    const { habits } = useHabits();
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
            {habits.length === 0 && <p className="mt-6 text-xl text-textMain">No habits found. Start by creating a new habit!</p>}

            <div className="grid grid-cols-3 gap-12 m-2 mb-6">
                {habits.map((habit) => (
                    <HabitCard key={habit._id} habit={habit} />
                ))}
            </div>
            
            <div className="flex justify-end">
                <button className="bg-bgButton text-white px-4 py-2 rounded hover:bg-bgButtonDark"
                    onClick={() => router.push('/habits/create/new')}>
                    Create New Habit
                </button>
            </div>
        </div>
    );
}

export default Habits;