import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGoals } from '@/context/GoalsContext';
import { useHabits, HabitObject } from '@/context/HabitsContext';

const HabitCard: React.FC<HabitObject> = ({ habit }) => {
  const { goals } = useGoals();
  const { removeHabit, markCompletion, checkCompletionCount } = useHabits();

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
      <div className="flex justify-between mt-2">
        <div className="flex">
          <button className="text-bgButton p-2 mr-4 rounded-full hover:text-bgButtonDark hover:bg-bgDashboard"
                onClick={() => removeHabit(habit._id)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          </button>
          <button className="text-bgButton p-2 rounded-full hover:text-bgButtonDark hover:bg-bgDashboard"
              onClick={() => router.push(`/habits/create/${habit._id}`)}>
            Edit
          </button>
        </div>
        <button className="flex justify-center p-2 rounded-full hover:bg-bgDashboard"
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
