'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGoals } from "@/context/GoalsContext";

const createGoalPage = () => {
    const { addGoal } = useGoals();
    const dtToday = new Date().toISOString().split('T')[0];
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [targetValue, setTargetValue] = useState(0);
    const [currentValue, setCurrentValue] = useState(0);
    const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
    const [status, setStatus] = useState("not started");
    const [priority, setPriority] = useState("medium");
    const router = useRouter();
    
    const handleCreateGoal = async () => {
        if (!title || !description || !targetDate || !targetValue || targetValue === 0) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            await addGoal({ title, description, targetValue, currentValue, targetDate, status, priority });
            router.push('/goals');
            router.refresh();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to create goal. Please try again.";
            alert(errorMessage);
        }
    };

    return (
        <div className="ml-4 mr-4">
            <h1 className="text-textMain text-2xl pb-6">Create Goal</h1>

            <div className="grid grid-cols-[15%_30%_15%_30%] gap-6">
                <p className="content-center text-textSecondary">Title:</p>
                <input type="text"
                    className="border border-gray-300 rounded p-4 w-sm col-span-3"
                    onChange={(e) => (setTitle(e.target.value))}
                />
                <p className="content-center text-textSecondary">Description:</p>
                <input type="text"
                    className="border border-gray-300 rounded p-4 w-sm col-span-3"
                    onChange={(e) => (setDescription(e.target.value))}
                />
                <p className="content-center text-textSecondary">Target value:</p>
                <input type="number"
                    className="border border-gray-300 rounded p-4 mr-6 w-3xs"
                    onChange={(e) => (setTargetValue(Number(e.target.value)))}
                />
                <p className="content-center text-textSecondary">Current value:</p>
                <input type="number"
                    className="border border-gray-300 rounded p-4 w-3xs"
                    defaultValue={0}
                    onChange={(e) => (setCurrentValue(Number(e.target.value)))}
                />
                <p className="content-center text-textSecondary">Target date:</p>
                <input type="date"
                    min={dtToday}
                    className="text-gray-400 scheme-dark border border-gray-300 rounded p-4 w-2xs col-span-3"
                    onChange={(e) => setTargetDate(e.target.value)}
                />
                <p className="content-center text-textSecondary">Status:</p>
                <select className="rounded-md bg-white/10 *:bg-gray-800 w-3xs p-4 mr-8 text-gray-400 text-sm font-semibold inset-ring-1 inset-ring-white/5 hover:bg-white/20"
                        defaultValue="not started"
                        onChange={(e) => setStatus(e.target.value)}>
                    <option value="not started">Not started</option>
                    <option value="in progress">In progress</option>
                    <option value="completed">Completed</option>
                    <option value="abandoned">Abandoned</option>
                </select>
                <p className="content-center text-textSecondary">Priority:</p>
                <select className="rounded-md bg-white/10 *:bg-gray-800 w-3xs p-4 text-gray-400 text-sm font-semibold inset-ring-1 inset-ring-white/5 hover:bg-white/20"
                        defaultValue="medium"
                        onChange={(e) => setPriority(e.target.value)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <br />
            <div className="flex justify-end">
                <button className="bg-bgButton text-white px-10 py-2 rounded hover:bg-bgButtonDark" onClick={handleCreateGoal}>
                    Create Goal
                </button>
            </div>
        </div>
    );
}

export default createGoalPage;