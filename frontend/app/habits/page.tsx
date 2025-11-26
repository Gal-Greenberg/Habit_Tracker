'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getHabits } from 'services/habits';
import HabitCard from '@/components/HabitCard';

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
        <div className="w-full h-full">
            {habits.length === 0 && <p className="mt-6 text-xl text-textMain">No habits found. Start by creating a new habit!</p>}

            <div className="grid grid-cols-3 gap-12 m-2 mb-10">
                {habits.map((habit) => (
                    <HabitCard key={habit._id} habit={habit} />
                ))}
            </div>
            
            <div className="flex justify-end">
                <button className="bg-bgButton text-white px-4 py-2 rounded hover:bg-bgButtonDark"
                    onClick={() => router.push('/habits/create')}>
                    Create New Habit
                </button>
            </div>
        </div>
    );
}

export default Habits;