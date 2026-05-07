import { isSameDay } from "date-fns";
import { useState, type ReactNode } from "react";
import { HabitContext, type Habit } from "./useHabits";


type HabitProviderProps = {
    children: ReactNode
}

export function HabitProvider({ children }: HabitProviderProps) {

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
        <HabitContext value={{ habits, addHabit, removeHabit, toggleHabit }}>
            {children}
        </HabitContext>
    )
}