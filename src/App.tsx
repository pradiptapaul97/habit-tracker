import { useState } from "react"
import { HabitForm } from "./components/HabitForm"
import { HabitList, type Habit } from "./components/HabitList"
import { Header } from "./components/header"

function App() {
  const [habits, setHabits] = useState<Habit[]>([]);

  function addHabit(name: string) {
    const newHabit: Habit = {
      id: Date.now(),
      name
    }
    setHabits(prev => [...prev, newHabit])
  }

  function removeHabit(id: number) {
    setHabits(prev => prev.filter(habit => habit.id !== id))
  }

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      <Header />
      <HabitForm addHabit={addHabit} />
      <HabitList habits={habits} removeHabit={removeHabit} />
    </div>
  )
}

export default App
