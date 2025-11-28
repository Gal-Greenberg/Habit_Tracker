'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useGoals } from "@/context/GoalsContext";
import { useHabits } from '@/context/HabitsContext';

const CreateHabitPage = () => {
    const { habits, addHabit, editHabit } = useHabits();

    const params = useParams();
    const id = params.id as string;
    const existingHabit = id != "new" ? habits.find((h) => h._id === id) : null;

    const { goals } = useGoals();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [frequencyValue, setFrequencyValue] = useState(0);
    const [frequencyUnit, setFrequencyUnit] = useState("");
    const [assignedGoal, setAssignedGoal] = useState("");
    const [pageText, setPageText] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (existingHabit) {
            setTitle(existingHabit.title);
            setDescription(existingHabit.description);
            setFrequencyValue(existingHabit.frequencyValue);
            setFrequencyUnit(existingHabit.frequencyUnit);
            setAssignedGoal(existingHabit.goal || "");
            setPageText("Update Habit");
        } else {
            setFrequencyUnit("Day");
            setPageText("Create Habit");
        }
    }, []);
    
    const handleCreateHabit = async () => {
        if (!title || !description || !frequencyValue || frequencyValue === 0 || !frequencyUnit) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const frequencyUnitL = frequencyUnit.toLowerCase();
            if (existingHabit) {
                await editHabit(existingHabit._id, { title, description, frequencyValue, frequencyUnit: frequencyUnitL, goal: assignedGoal });
            } else {
                await addHabit({ title, description, frequencyValue, frequencyUnit: frequencyUnitL, goal: assignedGoal });
            }
            router.push('/habits');
            router.refresh();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to create habit. Please try again.";
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
                <p className="content-center text-textSecondary">Frequency:</p>                
                <input type="number"
                    defaultValue={frequencyValue}
                    className="border border-gray-300 rounded p-4 w-3xs"
                    onChange={(e) => (setFrequencyValue(Number(e.target.value)))}
                />
                <div className="content-center text-textSecondary ">times per:</div   >
                <select className="rounded-md bg-white/10 *:bg-gray-800 w-3xs p-4 text-gray-400 text-sm font-semibold inset-ring-1 inset-ring-white/5 hover:bg-white/20"
                        value={frequencyUnit}
                        onChange={(e) => setFrequencyUnit(e.target.value)}>
                    <option value="Day">Day</option>
                    <option value="Week">Week</option>
                </select>
                <p className="content-center text-textSecondary">Assign to goal (optional):</p>
                <select className="rounded-md bg-white/10 *:bg-gray-800 w-lg p-4 text-gray-400 text-sm font-semibold inset-ring-1 inset-ring-white/5 hover:bg-white/20"
                        value={assignedGoal}
                        onChange={(e) => setAssignedGoal(e.target.value)}>
                    <option value="">Choose a goal to assign</option>
                    {goals && goals.map((goal: any) => (
                        <option key={goal._id} value={goal._id}>{goal.title}</option>
                    ))}
                </select>
            </div>

            <div className="flex justify-end mt-6">
                <button className="bg-bgButton text-white px-10 py-2 rounded hover:bg-bgButtonDark" onClick={handleCreateHabit}>
                    {pageText}
                </button>
            </div>
        </div>
    );
}

export default CreateHabitPage;