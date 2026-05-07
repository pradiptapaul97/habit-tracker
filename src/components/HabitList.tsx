import { eachDayOfInterval, endOfWeek, format, isFuture, isSameDay, startOfWeek } from "date-fns";
import { Button } from "./Button";
import { useHabits, type Habit } from "../context/useHabits";


export function HabitList({ visibleDates }: { visibleDates: Date[] }) {
    const { habits } = useHabits()
    if (habits.length === 0) {
        return (
            <p className="text-center text-zinc-500 py-12">No habits found. Add one to get started!</p>
        )
    }
    return (
        <div className="flex flex-col gap-3">
            {habits.map(habit => (
                <HabitItem key={habit.id} habit={habit} visibleDates={visibleDates} />
            ))}
        </div>
    )
}

type HabitItemProps = {
    habit: Habit;
    visibleDates: Date[];
}

function HabitItem({ habit, visibleDates }: HabitItemProps) {

    const { removeHabit, toggleHabit } = useHabits()

    const streak = getStreak(habit.completions);

    return (
        <div className="rounded-xl bg-zinc-800 p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <div className="flex gap-3 items-center">
                    <span className="font-medium">{habit.name}</span>
                    {streak !== 0 && <span className="text-sm text-amber-400"> 💥 {streak}</span>}
                </div>
                <Button onClick={() => removeHabit(habit.id)} className="text-sm" varient="ghost-destructive">Delete</Button>
            </div>
            <div className="flex gap-1.5">
                {visibleDates.map(date => (
                    <Button
                        className="flex flex-1 flex-col items-center gap-0.5 rounded-lg text-xs"
                        key={date.toISOString()}
                        disabled={isFuture(date)}
                        varient={habit.completions.some(c => isSameDay(c, date)) ? "primary" : "secondary"}
                        onClick={() => toggleHabit(habit.id, date)}
                    >
                        <span className="font-medium">{format(date, "EEE")}</span>
                        <span>{format(date, "d")}</span>
                    </Button>
                ))}
            </div>
        </div>
    )
}

function getStreak(completions: Date[]) {
    let stricks = 0;
    let today = new Date();
    completions.forEach(c => {
        if (isSameDay(c, today)) {
            stricks++;
        }
    });
    return stricks;
}