'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createGoal } from '../../services/goals';

const createGoalPage = () => {
    const dtToday = new Date().toISOString().split('T')[0];
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [targetDate, setTargetDate] = useState("");
    const [status, setStatus] = useState("not started");
    const [priority, setPriority] = useState("medium");
    const router = useRouter();
    
    const handleCreateGoal = async () => {
        if (!title || !description || !targetDate) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            await createGoal(title, description, targetDate, status, priority);
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

            <input type="date"
                min={dtToday}
                className="text-gray-400 scheme-dark border border-gray-300 rounded p-3 mb-6 w-xs"
                onChange={(e) => setTargetDate(e.target.value)}
            />
            <br />
            <div className="inline text-sm text-textMain mb-2 mr-2">Status:</div>
            <select className="rounded-md bg-white/10 *:bg-gray-800 w-3xs p-4 mr-8 text-gray-400 text-sm font-semibold inset-ring-1 inset-ring-white/5 hover:bg-white/20"
                    defaultValue="not started"
                    onChange={(e) => setStatus(e.target.value)}>
                <option value="not started">Not started</option>
                <option value="in progress">In progress</option>
                <option value="completed">Completed</option>
                <option value="abandoned">Abandoned</option>
            </select>
            <div className="inline text-sm text-textMain mb-2 mr-2">Priority:</div   >
            <select className="rounded-md bg-white/10 *:bg-gray-800 w-3xs p-4 text-gray-400 text-sm font-semibold inset-ring-1 inset-ring-white/5 hover:bg-white/20"
                    defaultValue="medium"
                    onChange={(e) => setPriority(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

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