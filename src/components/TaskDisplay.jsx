import { useState, useEffect } from 'react';
import { truthQuestions, dareQuestions } from '../data/questions';
import Button from './Layout/Button';
import { Check, Home, RefreshCw } from 'lucide-react';

// Fisher-Yates shuffle using crypto randomness
const shuffleArray = (arr) => {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const randArr = new Uint32Array(1);
    crypto.getRandomValues(randArr);
    const j = Math.floor((randArr[0] / (2 ** 32)) * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Get random item from array
const getRandomItem = (arr) => {
  if (arr.length === 0) return null;
  const randArr = new Uint32Array(1);
  crypto.getRandomValues(randArr);
  const randomIndex = Math.floor((randArr[0] / (2 ** 32)) * arr.length);
  return arr[randomIndex];
};

const TaskDisplay = ({ selectedPlayer, choice, onComplete, onHome }) => {
  const [task, setTask] = useState('');
  const [hasChangedTask, setHasChangedTask] = useState(false);
  const [usedTasks, setUsedTasks] = useState(new Set());

  useEffect(() => {
    initializeTask();
  }, [choice, selectedPlayer]);

  const initializeTask = () => {
    const storageKey = choice === "truth" ? "truthOrder" : "dareOrder";
    const playerUsedTasksKey = `usedTasks_${selectedPlayer.id}`;

    // Load used tasks for this player
    const playerUsedTasks = JSON.parse(localStorage.getItem(playerUsedTasksKey)) || [];
    const usedTasksSet = new Set(playerUsedTasks);
    setUsedTasks(usedTasksSet);

    // Load or create shuffled list
    let storedList = JSON.parse(localStorage.getItem(storageKey));

    if (!storedList || storedList.length === 0) {
      storedList = shuffleArray(choice === "truth" ? truthQuestions : dareQuestions);
      localStorage.setItem(storageKey, JSON.stringify(storedList));
    }

    // Filter out tasks this player has already used
    const availableTasks = storedList.filter(task => !usedTasksSet.has(task));
    
    if (availableTasks.length === 0) {
      // If no tasks left, reset for this player and get random from all tasks
      const allTasks = choice === "truth" ? truthQuestions : dareQuestions;
      const randomTask = getRandomItem(allTasks);
      setTask(randomTask);
      
      // Reset used tasks for this player
      localStorage.setItem(playerUsedTasksKey, JSON.stringify([]));
      setUsedTasks(new Set());
    } else {
      // Get RANDOM task from available tasks, not just the first one
      const randomTask = getRandomItem(availableTasks);
      setTask(randomTask);
    }

    setHasChangedTask(false);
  };

  const getNewRandomTask = () => {
    const storageKey = choice === "truth" ? "truthOrder" : "dareOrder";
    const playerUsedTasksKey = `usedTasks_${selectedPlayer.id}`;

    // Load current state
    let storedList = JSON.parse(localStorage.getItem(storageKey)) || [];
    const playerUsedTasks = JSON.parse(localStorage.getItem(playerUsedTasksKey)) || [];
    const usedTasksSet = new Set(playerUsedTasks);

    // Filter out used tasks and current task
    const availableTasks = storedList.filter(task => 
      !usedTasksSet.has(task) && task !== task
    );

    let newTask;
    
    if (availableTasks.length === 0) {
      // If no tasks left, get random task from all except current
      const allTasks = choice === "truth" ? truthQuestions : dareQuestions;
      const tasksExceptCurrent = allTasks.filter(t => t !== task);
      
      if (tasksExceptCurrent.length > 0) {
        newTask = getRandomItem(tasksExceptCurrent);
      } else {
        // If only current task remains (shouldn't happen), get any random
        newTask = getRandomItem(allTasks);
      }
      
      // Reset used tasks for this player since we're starting over
      localStorage.setItem(playerUsedTasksKey, JSON.stringify([]));
    } else {
      // Get RANDOM task from available tasks
      newTask = getRandomItem(availableTasks);
    }

    return newTask;
  };

  const handleChangeTask = () => {
    if (hasChangedTask) return;

    const newTask = getNewRandomTask();
    if (newTask) {
      setTask(newTask);
      setHasChangedTask(true);
    }
  };

  const handleComplete = () => {
    // Mark this task as used for the current player
    const playerUsedTasksKey = `usedTasks_${selectedPlayer.id}`;
    const playerUsedTasks = JSON.parse(localStorage.getItem(playerUsedTasksKey)) || [];
    
    if (!playerUsedTasks.includes(task)) {
      playerUsedTasks.push(task);
      localStorage.setItem(playerUsedTasksKey, JSON.stringify(playerUsedTasks));
    }

    // Remove the task from the main list to prevent reuse for other players
    const storageKey = choice === "truth" ? "truthOrder" : "dareOrder";
    let storedList = JSON.parse(localStorage.getItem(storageKey)) || [];
    const updatedList = storedList.filter(t => t !== task);
    
    // If we're running out of tasks, reshuffle with all questions
    if (updatedList.length < 5) {
      const allTasks = shuffleArray(choice === "truth" ? truthQuestions : dareQuestions);
      localStorage.setItem(storageKey, JSON.stringify(allTasks));
    } else {
      localStorage.setItem(storageKey, JSON.stringify(updatedList));
    }

    onComplete(task);
  };

  return (
    <div className="min-h-screen bg-royal-dark flex items-center justify-center p-4">
      <div className="bg-royal-mid rounded-2xl p-6 md:p-8 w-full max-w-2xl shadow-2xl border border-royal-border animate-bounce-in">
        <div className="text-center mb-6 md:mb-8">
          <div
            className={`inline-block px-4 py-2 rounded-full text-royal-light font-bold text-base md:text-lg mb-4 ${
              choice === 'truth' ? 'bg-royal-dark border-royal-accent' : 'bg-royal-dark border-royal-accent'
            }`}
          >
            {choice.toUpperCase()} for {selectedPlayer.name}
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-royal-light">
            Your {choice === 'truth' ? 'Truth' : 'Dare'} is:
          </h2>
        </div>

        <div className="bg-royal-dark rounded-xl p-6 md:p-8 mb-6 md:mb-8 border-2 border-royal-border">
          <p className="text-lg md:text-2xl text-royal-light text-center leading-relaxed">{task}</p>
        </div>

        {/* Change Task Indicator */}
        {hasChangedTask && (
          <div className="text-center mb-4">
            <p className="text-royal-accent text-sm">Task changed! This is your final task.</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
          {/* Change Task Button - Only show if not already changed */}
          {!hasChangedTask && (
            <Button
              onClick={handleChangeTask}
              variant="primary"
              className="w-full sm:w-auto px-6 md:px-8 text-base md:text-lg bg-[#1a647a] text-[#D6BD98] border border-[#D6BD98]"
            >
              <RefreshCw size={16} className="inline-block mr-2" /> 
              Change Task
            </Button>
          )}

          {/* Complete Button */}
          <Button
            onClick={handleComplete}
            variant="secondary"
            className="w-full sm:w-auto px-6 md:px-8 text-base md:text-lg bg-[#447f32] text-white"
          >
            <Check size={16} className="inline-block mr-2" /> 
            I Completed It
          </Button>

          {/* Home Button */}
          <Button
            onClick={onHome}
            variant="transparent"
            className="w-full sm:w-auto px-6 md:px-8 text-royal-light border border-royal-light text-sm py-2 rounded-lg bg-transparent hover:bg-royal-mid hover:border-royal-accent transition-colors"
          >
            <Home size={14} className="inline-block mr-2" /> 
            Home
          </Button>
        </div>

        {/* Instructions */}
        <div className="text-center mt-4 md:mt-6">
          <p className="text-royal-muted text-xs md:text-sm">
            {!hasChangedTask 
              ? "You can change your task once if you'd like a different challenge" 
              : "This is your final task - complete it to continue!"
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskDisplay;