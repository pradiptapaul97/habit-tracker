import { createContext, useContext } from "react";

export type Habit = {
    id: number;
    name: string;
    completions: Date[];
}

type Context = {
    habits: Habit[];
    addHabit: (name: string) => void;
    removeHabit: (id: number) => void;
    toggleHabit: (id: number, date: Date) => void;
}

export const HabitContext = createContext<Context | null>(null);

export function useHabits() {
    const context = useContext(HabitContext);
    if (context == null) {
        throw new Error("Null context");
    }
    return context;
}