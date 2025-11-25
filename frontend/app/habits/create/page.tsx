'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createHabit } from '../../services/habits';
import { getGoals } from '../../services/goals';

const createHabitPage = () => {
    const [goals, setGoals] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [frequency, setFrequency] = useState(0);
    const [frequencyUnit, setFrequencyUnit] = useState("");
    const [assignedGoal, setAssignedGoal] = useState("");
    const router = useRouter();

    useEffect(() => {
        const loadGoals = async () => {
            const data = await getGoals();
            setGoals(data);
        }
        loadGoals();
    }, []);
    
    const handleCreateHabit = async () => {
        if (!title || !description || !frequency || !frequencyUnit) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            await createHabit(title, description, frequency, frequencyUnit, assignedGoal);
            router.push('/habits');
            router.refresh();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to create habit. Please try again.";
            alert(errorMessage);
        }
    };

    return (
        <div className="ml-4 mr-4">
            <h1 className="text-textMain text-2xl pb-6">Create Habit</h1>

            <input type="text"
                placeholder="Title"
                className="border border-gray-300 rounded p-4 mb-6 w-sm"
                onChange={(e) => (setTitle(e.target.value))}
            />
            <br />
            <input type="text"
                placeholder="Description"
                className="border border-gray-300 rounded p-4 mb-6 w-sm"
                onChange={(e) => (setDescription(e.target.value))}
            />
            <br />
            
            <input type="number"
                placeholder="Frequency"
                className="border border-gray-300 rounded p-4 mb-6 mr-20 w-sm"
                onChange={(e) => (setFrequency(Number(e.target.value)))}
            />
            <select className="rounded-md bg-white/10 *:bg-gray-800 w-xs p-4 text-gray-400 text-sm font-semibold inset-ring-1 inset-ring-white/5 hover:bg-white/20"
                    defaultValue="select"
                    onChange={(e) => setFrequencyUnit(e.target.value)}>
                <option value="select" disabled>Frequency unit</option>
                <option value="Hours">Hours</option>
                <option value="Days">Days</option>
                <option value="Weeks">Weeks</option>
            </select>
            <br />
            <select className="rounded-md bg-white/10 *:bg-gray-800 w-lg p-4 text-gray-400 text-sm font-semibold inset-ring-1 inset-ring-white/5 hover:bg-white/20"
                    defaultValue=""
                    onChange={(e) => setAssignedGoal(e.target.value)}>
                <option value="">Choose a goal to assign</option>
                {goals && goals.map((goal: any) => (
                    <option key={goal._id} value={goal._id}>{goal.title}</option>
                ))}
            </select>

            <br />
            <div className="flex justify-end">
                <button className="bg-bgButton text-white px-10 py-2 rounded hover:bg-bgButtonDark" onClick={handleCreateHabit}>
                    Create Habit
                </button>
            </div>
        </div>
    );
}

export default createHabitPage;