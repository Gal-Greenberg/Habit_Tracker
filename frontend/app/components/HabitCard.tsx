import { useEffect, useState } from 'react';
import { completeHabit } from 'services/habits';

interface Habit {
    habit : {
      _id: string;
      title: string;
      description: string;
      frequencyValue: number;
      frequencyUnit: string;
      completionCount: number;
      goal?: string;
    }
}

const HabitCard: React.FC<Habit> = ({ habit }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [extraProgress, setExtraProgress] = useState(0);

  useEffect(() => {
    checkCompletionCount();
  }, []);

  const handleCompleteHabit = () => {
    completeHabit(habit._id).then(() => {
      habit.completionCount += 1;
      checkCompletionCount();
    }).catch((error) => {
      console.error("Error completing habit:", error);
    });
  };

  const checkCompletionCount = () => {
    if (habit.completionCount > habit.frequencyValue) {
      setProgressPercentage(100);
      setExtraProgress(habit.completionCount - habit.frequencyValue);
    } else {
      const percentage = ((habit.completionCount / habit.frequencyValue) * 100);
      setProgressPercentage(parseFloat(percentage.toFixed(1)));
      setExtraProgress(0);
    }
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
              strokeDashoffset={circumference - (progressPercentage / 100) * circumference}
              className="stroke-bgButtonDark transition-all duration-500 ease-in-out"
              id="progress-circle"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-textMain">
            {progressPercentage}%
          </div>
        </div>
      </div>

      <div className="min-h-6">
        {habit.goal && <p className="text-bgButton">part of a goal {habit.goal}</p>}
      </div>
      <div className="min-h-6">
        {extraProgress > 0 && <p className="text-bgButton text-center">🔥 {extraProgress} Extra Completion!</p>}
      </div>
      
      <p className="text-textSecondary mt-2">{habit.frequencyValue} times per {habit.frequencyUnit}</p>
      <div className="flex justify-between">
        <button className="text-bgButton w-16 py-2 rounded hover:text-bgButtonDark mt-2">
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
