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
        
        var updatedHabit = await updateHabit(id, data);
        updatedHabit = calcCompletionCount(updatedHabit)
        setHabits(habits.map(h => h._id === id ? updatedHabit : h));
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
        setHabits(prev => {
            const habit = prev.find(h => h._id === id);
            const updatedHabit = calcCompletionCount(habit);
            return prev.map(h => h._id === id ? updatedHabit : h);
        });
    };

    const calcCompletionCount = (habit: Habit) => {
        let progressPercentageNew, extraProgressNew;

        if (habit.completionCount > habit.frequencyValue) {
            progressPercentageNew = 100;
            extraProgressNew = habit.completionCount - habit.frequencyValue;
        } else {
            progressPercentageNew = Number(((habit.completionCount / habit.frequencyValue) * 100).toFixed(1));
            extraProgressNew = 0;
        }
        
        const updatedHabit = {
            ...habit,
            progressPercentage: progressPercentageNew,
            extraProgress: extraProgressNew,
        };
        return updatedHabit;
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