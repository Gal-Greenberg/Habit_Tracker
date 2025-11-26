
interface Habit {
    habit : {
        _id: string;
        title: string;
        description: string;
        frequencyValue: number;
        frequencyUnit: string;
        completionCount: number;
    }
}

const HabitCard: React.FC<Habit> = ({ habit }) => {
  const radius = 50;
  const progressPercentage = ((habit.completionCount / habit.frequencyValue) * 100).toFixed(1);
  const circumference = 2 * Math.PI * radius; 

  return (
    <div className="bg-black rounded-lg p-4">
      <p className="text-textMain text-xl">{habit.title}</p>
      <p className="text-textSecondary mt-2">{habit.description}</p>

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
            strokeDashoffset={circumference - (parseFloat(progressPercentage) / 100) * circumference}
            className="stroke-bgButtonDark transition-all duration-500 ease-in-out"
            id="progress-circle"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-textMain">
          {progressPercentage}%
        </div>
      </div>
      </div>

      <p className="text-textSecondary mt-2">{habit.frequencyValue} times per {habit.frequencyUnit}</p>
    </div>
  );
}

export default HabitCard;
