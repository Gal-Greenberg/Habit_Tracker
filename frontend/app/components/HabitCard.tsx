import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGoals } from '@/context/GoalsContext';
import { useHabits, HabitObject } from '@/context/HabitsContext';

const HabitCard: React.FC<HabitObject> = ({ habit }) => {
  const { goals } = useGoals();
  const { markCompletion, checkCompletionCount } = useHabits();

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (habit.progressPercentage / 100) * circumference || 0;
  const goal = goals.find(g => g._id === habit.goal);

  const router = useRouter();

  useEffect(() => {
    checkCompletionCount(habit._id);
  }, []);

  const handleCompleteHabit = async () => {
    await markCompletion(habit._id);
    checkCompletionCount(habit._id);
  };

  return (
    <div className="bg-black rounded-lg p-4">
      <p className="text-textMain text-xl">{habit.title}</p>
      <p className="text-textSecondary mt-2">{habit.description}</p>

      <p className="text-textSecondary mt-2">{habit.frequencyUnit} Progress:</p>
      <div className="flex justify-center m-4">
        <div className="relative w-32 h-32">
          <svg className="transform -rotate-90 w-full h-full">
            <circle cx="50%" cy="50%"
              r={radius}
              strokeWidth="8"
              fill="transparent"
              className="stroke-textSecondary"
            />
            <circle cx="50%" cy="50%"
              r={radius}
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="stroke-bgButtonDark transition-all duration-500 ease-in-out"
              id="progress-circle"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-textMain">
            {habit.progressPercentage}%
          </div>
        </div>
      </div>

      <div className="min-h-6">
        {goal && <p className="text-bgButton">part of a goal {goal.title}</p>}
      </div>
      <div className="min-h-6 mt-2">
        {habit.extraProgress > 0 && <p className="text-bgButton text-center">🔥 {habit.extraProgress} Extra Completion!</p>}
      </div>
      
      <p className="text-textSecondary mt-2">{habit.frequencyValue} times per {habit.frequencyUnit}</p>
      <div className="flex justify-between">
        <button className="text-bgButton w-16 py-2 rounded hover:text-bgButtonDark mt-2"
            onClick={() => router.push(`/habits/create/${habit._id}`)}>
          Edit
        </button>
        <button className="flex justify-center w-16 py-2 rounded mt-2"
            onClick={handleCompleteHabit}>
          <svg viewBox="0 0 24 24"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          ><polyline className="text-bgButton hover:text-bgButtonDark" points="20 6 9 17 4 12" /></svg>
        </button>
      </div>
    </div>
  );
}

export default HabitCard;
