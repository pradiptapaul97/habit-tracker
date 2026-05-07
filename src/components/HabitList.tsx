import { eachDayOfInterval, endOfWeek, format, isFuture, startOfWeek } from "date-fns";
import { Button } from "./button";

export type Habit = {
    id: number;
    name: string;
}

type HabitListProps = {
    habits: Habit[];
    removeHabit: (id: number) => void;
}
export function HabitList({ habits, removeHabit }: HabitListProps) {
    if (habits.length === 0) {
        return (
            <p className="text-center text-zinc-500 py-12">No habits found. Add one to get started!</p>
        )
    }
    return (
        <div className="flex flex-col gap-3">
            {habits.map(habit => (
                <HabitItem key={habit.id} habit={habit} removeHabit={removeHabit} />
            ))}
        </div>
    )
}

type HabitItemProps = {
    habit: Habit
    removeHabit: (id: number) => void;
}

function HabitItem({ habit, removeHabit }: HabitItemProps) {

    const visibleDates = eachDayOfInterval({
        start: startOfWeek(new Date(), { weekStartsOn: 1 }),
        end: endOfWeek(new Date(), { weekStartsOn: 1 })
    })

    return (
        <div className="rounded-xl bg-zinc-800 p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <div className="flex gap-3 items-center">
                    <span className="font-medium">{habit.name}</span>
                    <span className="text-sm text-amber-400"> 💥 3</span>
                </div>
                <Button onClick={() => removeHabit(habit.id)} className="text-sm" varient="ghost-destructive">Delete</Button>
            </div>
            <div className="flex gap-1.5">
                {visibleDates.map(date => (
                    <Button className="flex flex-1 flex-col items-center gap-0.5 rounded-lg text-xs" key={date.toISOString()} disabled={isFuture(date)}>
                        <span className="font-medium">{format(date, "EEE")}</span>
                        <span>{format(date, "d")}</span>
                    </Button>
                ))}
            </div>
        </div>
    )
}