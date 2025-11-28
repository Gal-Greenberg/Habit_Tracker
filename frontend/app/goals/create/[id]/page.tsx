'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useGoals } from "@/context/GoalsContext";

const CreateGoalPage = () => {
    const { goals, addGoal, editGoal } = useGoals();

    const params = useParams();
    const id = params.id as string;
    const existingGoal = id != "new" ? goals.find((g) => g._id === id) : null;
    
    const dtToday = new Date().toISOString().split('T')[0];
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [targetValue, setTargetValue] = useState(0);
    const [currentValue, setCurrentValue] = useState(0);
    const [targetDate, setTargetDate] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [pageText, setPageText] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (existingGoal) {
            setTitle(existingGoal.title);
            setDescription(existingGoal.description);
            setTargetValue(Number(existingGoal.targetValue));
            setCurrentValue(Number(existingGoal.currentValue));
            setTargetDate(new Date(existingGoal.targetDate).toISOString().split('T')[0]);
            setStatus(existingGoal.status);
            setPriority(existingGoal.priority);
            setPageText("Update Goal");
        } else {
            setTargetDate(new Date().toISOString().split('T')[0])
            setStatus("not started");
            setPriority("medium");
            setPageText("Create Goal");
        }
    }, []);
        
    const handleCreateGoal = async () => {
        if (!title || !description || !targetDate || !targetValue || targetValue === 0) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            if (existingGoal) {
                await editGoal(existingGoal._id, { title, description, targetValue, currentValue, targetDate, status, priority });
            } else {
                await addGoal({ title, description, targetValue, currentValue, targetDate, status, priority });
            }
            router.push('/goals');
            router.refresh();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to create goal. Please try again.";
            alert(errorMessage);
        }
    };

    return (
        <div>
            <h1 className="text-textMain text-2xl pb-6">{pageText}</h1>

            <div className="grid grid-cols-[15%_30%_15%_30%] gap-6">
                <p className="content-center text-textSecondary">Title:</p>
                <input type="text"
                    defaultValue={title}
                    className="border border-gray-300 rounded p-4 w-sm col-span-3"
                    onChange={(e) => (setTitle(e.target.value))}
                />
                <p className="content-center text-textSecondary">Description:</p>
                <input type="text"
                    defaultValue={description}
                    className="border border-gray-300 rounded p-4 w-sm col-span-3"
                    onChange={(e) => (setDescription(e.target.value))}
                />
                <p className="content-center text-textSecondary">Target value:</p>
                <input type="number"
                    defaultValue={targetValue}
                    className="border border-gray-300 rounded p-4 mr-6 w-3xs"
                    onChange={(e) => (setTargetValue(Number(e.target.value)))}
                />
                <p className="content-center text-textSecondary">Current value:</p>
                <input type="number"
                    defaultValue={currentValue}
                    className="border border-gray-300 rounded p-4 w-3xs"
                    onChange={(e) => (setCurrentValue(Number(e.target.value)))}
                />
                <p className="content-center text-textSecondary">Target date:</p>
                <input type="date"
                    defaultValue={targetDate}
                    min={dtToday}
                    className="text-gray-400 scheme-dark border border-gray-300 rounded p-4 w-2xs col-span-3"
                    onChange={(e) => setTargetDate(e.target.value)}
                />
                <p className="content-center text-textSecondary">Status:</p>
                <select className="rounded-md bg-white/10 *:bg-gray-800 w-3xs p-4 mr-8 text-gray-400 text-sm font-semibold inset-ring-1 inset-ring-white/5 hover:bg-white/20"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}>
                    <option value="not started">Not started</option>
                    <option value="in progress">In progress</option>
                    <option value="completed">Completed</option>
                    <option value="abandoned">Abandoned</option>
                </select>
                <p className="content-center text-textSecondary">Priority:</p>
                <select className="rounded-md bg-white/10 *:bg-gray-800 w-3xs p-4 text-gray-400 text-sm font-semibold inset-ring-1 inset-ring-white/5 hover:bg-white/20"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <div className="flex justify-end mt-6">
                <button className="bg-bgButton text-white px-10 py-2 rounded hover:bg-bgButtonDark" 
                    onClick={handleCreateGoal}>
                    {pageText}
                </button>
            </div>
        </div>
    );
}

export default CreateGoalPage;