import { useState } from "react"
import { HabitForm } from "./components/HabitForm"
import { HabitList, type Habit } from "./components/HabitList"
import { Header } from "./components/header"
import { isSameDay } from "date-fns";

function App() {
  const [habits, setHabits] = useState<Habit[]>([]);

  function addHabit(name: string) {
    const newHabit: Habit = {
      id: Date.now(),
      name,
      completions: []
    }
    setHabits(prev => [...prev, newHabit])
  }

  function removeHabit(id: number) {
    setHabits(prev => prev.filter(habit => habit.id !== id))
  }

  function toggleHabit(id: number, date: Date) {
    setHabits(prev => prev.map(habit => {
      if (habit.id !== id) return habit;

      const alreadyCompleted = habit.completions.some(c => isSameDay(c, date));

      const completions = alreadyCompleted ? habit.completions.filter(c => !isSameDay(c, date)) : [...habit.completions, date];

      return { ...habit, completions };
    }))
  }


  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      <Header />
      <HabitForm addHabit={addHabit} />
      <HabitList habits={habits} removeHabit={removeHabit} toggleHabit={toggleHabit} />
    </div>
  )
}

export default App
