'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getGoals, createGoal, updateGoal, deleteGoal } from "services/goals";

interface ProviderProps {
    children: ReactNode;
}

export interface Goal {
    _id: string;
    title: string;
    description: string;
    targetValue: Number;
    currentValue: Number;
    targetDate: Date;
    status: string;
    priority: string;
}

interface GoalsContextType {
    goals: Goal[];
    addGoal: (data: any) => Promise<void>;
    editGoal: (id: string, data: any) => Promise<void>;
    removeGoal: (id: string) => Promise<void>;
}

const GoalsContext = createContext<GoalsContextType | null>(null);

export const GoalsProvider = ({ children }: ProviderProps) => {
    const [goals, setGoals] = useState<any[]>([]);

    useEffect(() => {
        getGoals().then(fetchedGoals => {
            setGoals(fetchedGoals);
        }).catch(error => {
            console.error("Error fetching goals:", error);
        });
    }, []);

    const addGoal = async (data: any) => {
        const newGoal = await createGoal(data);
        setGoals([...goals, newGoal]);
    };
    
    const editGoal = async (id: string, data: any) => {
        const updatedGoal = await updateGoal(id, data);
        setGoals(goals.map(goal => goal._id === id ? updatedGoal : goal));
    };

    const removeGoal = async (id: string) => {
        await deleteGoal(id);
        setGoals(goals.filter(goal => goal._id !== id));
    };

    return (
        <GoalsContext.Provider value={{ goals, addGoal, editGoal, removeGoal }}>
            {children}
        </GoalsContext.Provider>
    );
};

export const useGoals = () => {
    const ctx = useContext(GoalsContext);
    if (!ctx) {
        throw new Error("useGoals must be used within <GoalsProvider>");
    }
    return ctx;
};