'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getHabits, createHabit, updateHabit, deleteHabit, completeHabit } from "services/habits";

interface ProviderProps {
    children: ReactNode;
}

export interface HabitObject {
    habit : Habit;
}

interface Habit {
    _id: string;
    title: string;
    description: string;
    frequencyValue: number;
    frequencyUnit: string;
    goal?: string;
    completionCount: number;
    progressPercentage: number;
    extraProgress: number;
}

interface HabitsContextType {
    habits: Habit[];
    addHabit: (data: any) => Promise<void>;
    editHabit: (id: string, data: any) => Promise<void>;
    removeHabit: (id: string) => Promise<void>;
    markCompletion: (id: string) => Promise<void>;
    checkCompletionCount: (id: string) => Promise<void>;
}

const HabitsContext = createContext<HabitsContextType | null>(null);

export const HabitsProvider = ({ children }: ProviderProps) => {
    const [habits, setHabits] = useState<any[]>([]);

    useEffect(() => {
        getHabits().then(fetchedHabits => {
            setHabits(fetchedHabits);
        }).catch(error => {
            console.error("Error fetching habits:", error);
        });
    }, []);

    const addHabit = async (data: any) => {
        if (!data.goal) {
            delete data.goal;
        }        
        const newHabit = await createHabit(data);
        setHabits([...habits, newHabit]);
    };
    
    const editHabit = async (id: string, data: any) => {
        if (!data.goal) {
            delete data.goal;
        }
        
        const updatedHabit = await updateHabit(id, data);
        setHabits(habits.map(habit => habit._id === id ? updatedHabit : habit));
    };

    const removeHabit = async (id: string) => {
        await deleteHabit(id);
        setHabits(habits.filter(habit => habit._id !== id));
    };

    const markCompletion = async (id: string) => {
        const habit = habits.find(h => h._id === id);
        if (habit) {
            habit.completionCount += 1;
            setHabits([...habits]);
            completeHabit(id);
        }
    };

    const checkCompletionCount = async (id: string) => {
        const updatedHabit = habits.find(h => h._id === id);
        if (updatedHabit.completionCount > updatedHabit.frequencyValue) {
            updatedHabit.progressPercentage = 100;
            updatedHabit.extraProgress = updatedHabit.completionCount - updatedHabit.frequencyValue;
        } else {
            const percentage = ((updatedHabit.completionCount / updatedHabit.frequencyValue) * 100);
            updatedHabit.progressPercentage = parseFloat(percentage.toFixed(1));
            updatedHabit.extraProgress = 0;
        }
        setHabits(habits.map(habit => habit._id === id ? updatedHabit : habit));
    };


    return (
        <HabitsContext.Provider value={{ habits, addHabit, editHabit, removeHabit, markCompletion, checkCompletionCount }}>
            {children}
        </HabitsContext.Provider>
    );
}

export const useHabits = () => {
    const context = useContext(HabitsContext);
    if (!context) {
        throw new Error("useHabits must be used within a HabitsProvider");
    }
    return context;
}